import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function CryptoGraph() {
  const { id } = useParams();
  const { currency } = useContext(CoinContext);

  const [coindata, setData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(1);

  const fetchData = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.name.toLowerCase()}&days=${days}`
      );

      const data = await res.json();

      const formatted = data.prices.map((item) => {
        const date = new Date(item[0]);

        return {
          fullDate: date.toLocaleString(),
          label:
            days === 1
              ? date.toLocaleTimeString()
              : days <= 7
              ? date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                }),
          price: item[1],
        };
      });

      setChartData(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchChartData();
  }, [id, days]);

  if (!coindata) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  const isUp =
    chartData.length > 1 &&
    chartData[chartData.length - 1].price >
      chartData[0].price;

  const isMobile = window.innerWidth < 640;

  return (
    <div className="text-white flex flex-col items-stretch mt-6 sm:mt-10 px-3 sm:px-4 pb-20">

      {/* Coin Info */}
      <div className="flex flex-col items-center">
        <img
          src={coindata.image?.large}
          alt={coindata.name}
          className="w-14 sm:w-20 h-14 sm:h-20 mb-3 sm:mb-4"
        />

        <h1 className="text-xl sm:text-3xl font-bold text-center">
          {coindata.name}
        </h1>

        <p className="uppercase text-gray-400 text-sm sm:text-base">
          {coindata.symbol}
        </p>

        <p className="mt-3 sm:mt-4 text-base sm:text-xl text-center mb-6">
          Price: {currency.symbol}
          {coindata.market_data?.current_price[
            currency.name.toLowerCase()
          ]?.toLocaleString()}
        </p>
      </div>

      {/* Time Buttons */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
        {[1, 7, 30, 365].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm ${
              days === d
                ? "bg-purple-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {d === 1 ? "1D" : d === 7 ? "7D" : d === 30 ? "30D" : "1Y"}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full min-w-0 max-w-4xl h-55 sm:h-70 md:h-87.5 mx-auto mb-10 border border-purple-500 rounded-xl p-2 sm:p-4 bg-black/30 flex items-center justify-center">

        {chartData.length === 0 ? (
          <p className="text-gray-400">Loading chart...</p>
        ) : (
          <ResponsiveContainer width="99%" height="100%" minWidth={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />

              <XAxis
                dataKey="label"
                tick={{ fill: "#aaa", fontSize: 10 }}
                interval="preserveStartEnd"
                tickLine={false}
                axisLine={false}
                height={60}
                angle={isMobile ? -25 : 0}
                textAnchor={isMobile ? "end" : "middle"}
              />

              <YAxis
                domain={["auto", "auto"]}
                tick={{ fill: "#ccc", fontSize: 10 }}
              />

              <Tooltip
                formatter={(value) =>
                  `${currency.symbol}${value.toLocaleString()}`
                }
                labelFormatter={(label, payload) => {
                  if (payload && payload.length) {
                    return payload[0].payload.fullDate;
                  }
                  return label;
                }}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke={isUp ? "#22c55e" : "#ef4444"}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Stats */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">

        <div className="bg-black/30 border border-purple-500 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">Market Rank</p>
          <p className="text-base sm:text-lg font-semibold">
            #{coindata.market_cap_rank}
          </p>
        </div>

        <div className="bg-black/30 border border-purple-500 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">Market Cap</p>
          <p className="text-base sm:text-lg font-semibold wrap-break-words">
            {currency.symbol}
            {coindata.market_data?.market_cap[
              currency.name.toLowerCase()
            ]?.toLocaleString()}
          </p>
        </div>

        <div className="bg-black/30 border border-purple-500 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">24H Change</p>
          <p
            className={`text-base sm:text-lg font-semibold ${
              coindata.market_data?.price_change_percentage_24h > 0
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {coindata.market_data?.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>

        <div className="bg-black/30 border border-purple-500 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">24H High</p>
          <p className="text-base sm:text-lg font-semibold wrap-break-words">
            {currency.symbol}
            {coindata.market_data?.high_24h[
              currency.name.toLowerCase()
            ]?.toLocaleString()}
          </p>
        </div>

        <div className="bg-black/30 border border-purple-500 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">24H Low</p>
          <p className="text-base sm:text-lg font-semibold wrap-break-words">
            {currency.symbol}
            {coindata.market_data?.low_24h[
              currency.name.toLowerCase()
            ]?.toLocaleString()}
          </p>
        </div>

      </div>
    </div>
  );
}