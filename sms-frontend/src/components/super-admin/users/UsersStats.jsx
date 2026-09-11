import {
  Users,
  GraduationCap,
  UserRoundCheck,
  UserCog,
  CheckCircle,
} from "lucide-react";

const UsersStats = ({ users = [] }) => {
  const totalUsers = users.length;

  const totalStudents = users.filter((user) => user.role === "student").length;

  const totalTeachers = users.filter((user) => user.role === "teacher").length;

  const totalAdmins = users.filter((user) => user.role === "admin").length;

  const activeUsers = users.filter((user) => user.status === "active").length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },

    {
      title: "Students",
      value: totalStudents,
      icon: GraduationCap,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
    },

    {
      title: "Teachers",
      value: totalTeachers,
      icon: UserRoundCheck,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },

    {
      title: "Admins",
      value: totalAdmins,
      icon: UserCog,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },

    {
      title: "Active Users",
      value: activeUsers,
      icon: CheckCircle,
      bg: "bg-green-100",
      text: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>

                <h2 className="mt-1 text-2xl font-bold text-gray-800">
                  {stat.value}
                </h2>
              </div>

              <div className={`rounded-xl p-3 ${stat.bg}`}>
                <Icon size={22} className={stat.text} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UsersStats;
