import { Award, CheckCircle, XCircle, BarChart3 } from "lucide-react";

const ScoreStats = ({ scores = [] }) => {
  const total = scores.length;

  const passed = scores.filter((item) => {
    const score = Number(item.score || 0);
    const maxScore = Number(item.max_score || 100);

    return maxScore > 0 && (score / maxScore) * 100 >= 50;
  }).length;

  const failed = total - passed;

  const average = total
    ? (
        scores.reduce((sum, item) => {
          const score = Number(item.score || 0);
          const maxScore = Number(item.max_score || 100);

          if (maxScore <= 0) {
            return sum;
          }

          return sum + (score / maxScore) * 100;
        }, 0) / total
      ).toFixed(1)
    : 0;

  const cards = [
    {
      title: "Total Scores",
      value: total,
      icon: Award,
    },
    {
      title: "Passed",
      value: passed,
      icon: CheckCircle,
    },
    {
      title: "Failed",
      value: failed,
      icon: XCircle,
    },
    {
      title: "Average",
      value: `${average}%`,
      icon: BarChart3,
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>

                <p className="mt-1 text-2xl font-bold text-gray-800">
                  {card.value}
                </p>
              </div>

              <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScoreStats;
