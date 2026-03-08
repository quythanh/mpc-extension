import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  type Plugin,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from "react-chartjs-2";
import { StatisticDataType } from "@/entrypoints/sidepanel/StatisticTab/type";

const legendMarginPlugin: Plugin = {
  id: "legendMargin",
  beforeInit(chart) {
    const legend = chart.legend;
    if (!legend) {
      return;
    }
    const originalFit = legend.fit.bind(legend);
    legend.fit = function () {
      originalFit();
      this.height += 16;
    };
  }
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, ChartDataLabels);

type Props = {
  statistic: StatisticDataType;
  fixedPoint: number;
};

const SemesterAverageChart = ({ statistic, fixedPoint }: Props) => {
  const labels = statistic.semester.data.map((s) => s.title);
  const data10 = statistic.semester.data.map((s) => s.scale10);
  const data4 = statistic.semester.data.map((s) => s.scale4);

  const data = {
    labels,
    datasets: [
      {
        label: "Điểm hệ 10",
        data: data10,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)"
      },
      {
        label: "Điểm hệ 4",
        data: data4,
        borderColor: "#fb900b",
        backgroundColor: "#343434"
      }
    ]
  };

  const datalabelsOptions = {
    anchor: "end" as const,
    align: "top" as const,
    offset: 4,
    font: {
      size: 11,
      weight: "bold" as const
    },
    formatter: (value: number) => value.toFixed(fixedPoint)
  };

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      }
    },
    plugins: {
      title: {
        display: true,
        text: "ĐIỂM TRUNG BÌNH QUA TỪNG HỌC KỲ",
        font: { size: 15 }
      },

      datalabels: datalabelsOptions
    },
    scales: {
      x: { ticks: { display: false } },
      y: {
        beginAtZero: true,
        ticks: {
          display: true,
          padding: 20
        }
      }
    }
  };

  return (
    <div className='min-h-50'>
      <Line data={data} options={options} plugins={[legendMarginPlugin]} />
    </div>
  );
};

export { SemesterAverageChart };
