import OpenIcon from "@material-ui/icons/Launch";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";
import { getUsers, deleteUser } from "../../redux/actions/users_actions";

const columns = [
  {
    title: "إسم الدخول",
    field: "userName",
  },
  {
    title: "اسم الوكالة",
    field: "name",
  },
  {
    title: "اسم المالك",
    field: "ownerName",
  },
  {
    title: "الإسم",
    field: "name",
  },
  {
    title: "رقم الهاتف",
    field: "phoneNumber",
  },
  {
    title: "الايميل",
    field: "email",
  },
  {
    title: "الصلاحية",
    field: "role",
  },
];

const getRole = (role) => {
  switch (role) {
    case "admin":
      role = "ادمن";
      break;
    case "lab":
      role = "موظف معمل";
      break;
    case "agency":
      role = "وكالة";
      break;
    case "user":
      role = "مستخدم";
      break;
    default:
      break;
  }
};

export default function Users(props) {
  const history = useHistory();
  const role = useSelector((store) => store.authReducer.role);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (role === "admin" || role === "super admin") {
        const result = await getUsers();
        const users = result.map((user) => ({
          ...user,
          role: getRole(user.role),
        }));
        setUsers(users);
      }
    };
    fetchData();
  }, [role]);

  return role === "admin" || role === "super admin" ? (
    <div style={{ margin: "50px", width: "75vw" }}>
      <MaterialTable
        title="المستخدمين"
        data={users}
        columns={columns}
        options={{
          exportButton: true,
          grouping: true,
          // selection: true,
          rowStyle: {
            backgroundColor: "#EEE",
          },
        }}
        localization={{
          toolbar: {
            searchPlaceholder: "بحث",
            searchTooltip: "بحث",
            exportTitle: "تحميل التقرير",
            exportName: "تحميل التقرير",
          },
          pagination: {
            labelDisplayedRows: " {from} الى {to}  من اصل {count}",
            lastTooltip: "النهاية",
            firstTooltip: "البداية",
            previousTooltip: "السابق",
            nextTooltip: "التالي",
            labelRowsSelect: "صفوف",
          },
          header: {
            actions: "",
          },
          body: {
            emptyDataSourceMessage: "لا توجد بيانات",
            filterRow: {
              filterTooltip: "تصنيف",
            },
            deleteTooltip: "مسح",
            editTooltip: "تعديل",
          },
          grouping: {
            placeholder:
              "قم بسحب عنوان الصف والقاءه هنا لكي تقوم بالتصنيف بناء عليه",
          },
        }}
        actions={[
          {
            icon: () => <OpenIcon></OpenIcon>,
            tooltip: "الذهاب الي المستخدم",
            onClick: (event, data) => {
              history.push(`/user/${data._id}`);
            },
          },
          {
            icon: "delete",
            tooltip: "حذف المستخدم",
            onClick: async (event, data) => {
              await deleteUser(data._id).catch(() => {
                return;
              });
              setUsers(users.filter((user) => user._id !== data._id));
            },
          },
        ]}
      />
    </div>
  ) : (
    <Redirect to="/dashboard" />
  );
}
