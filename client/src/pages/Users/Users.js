import OpenIcon from "@material-ui/icons/Launch";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { useHistory, Redirect } from "react-router-dom";
import { getUsers, deleteUser } from "../../redux/actions/users_actions";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { set } from "date-fns";


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
    title: "نوع الجهة",
    field: "type",
  },
];

const getType = (type) => {
  switch (type) {
    case "corporate":
      type = "شركة";
      break;
    case "organization":
      type = "منظمة";
      break;
    case "agency":
      type = "وكالة";
      break;
    case "diplomatic committee":
      type = "بعثة دبلوماسية";
      break;
      case "recruitment office":
      type = "مكتب استخدام";
      break;
      case "individuals":
      type = "افراد";
      break;
      case "other":
      type = "اخرى";
      break;
    default:
      break;
  }
};

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
  const [message, setMessage] = useState({
    text: ""
  });
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [whatsappModal, setWhatsappModal] = useState(false);

  const handleMessageChange = (e) => {
setMessage({[e.target.name]: e.target.value});
  }

  const handleCloseMessageModal = () => {
setWhatsappModal(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (role === "admin" || role === "super admin") {
        const result = await getUsers();
      if(result)
      
      {
        result.forEach(u => {
    switch (u.type) {
    case "corporate":
      u.type = "شركة";
      break;
    case "organization":
      u.type = "منظمة";
      break;
    case "agency":
      u.type = "وكالة";
      break;
    case "diplomatic committee":
      u.type = "بعثة دبلوماسية";
      break;
      case "recruitment office":
      u.type = "مكتب استخدام";
      break;
      case "individuals":
      u.type = "افراد";
      break;
      case "other":
      u.type = "اخرى";
      break;
    default:
      break;
  }
        })
        const users = result.map((user) => ({
          ...user,
          role: getRole(user.role),
        }));
        setUsers(users);
      }}
    };
    fetchData();
  }, [role]);

  return role === "admin" || role === "super admin" ? (
    <div style={{ margin: "50px", width: "75vw" }}>
      <Dialog open={whatsappModal} onClose={handleCloseMessageModal}>
        <DialogTitle> ادخل الرسالة </DialogTitle>
        <DialogContent>
          <Grid container spacing={5}>
            <Grid dir="rtl" item xs={12}>
              <TextField
                label="الرسالة"
                dir="rtl"
                name="text"
                onChange={handleMessageChange}
                value={message.text}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ margin: "auto" }}>
          <Button onClick={handleCloseMessageModal} color="primary">
            انهاء
          </Button>
          <Button
            onClick={() =>
              window.open(
                `https://api.whatsapp.com/send?phone=249${userPhoneNumber}&text=${message.text}`,
                "_blank"
              )
            }
            color="secondary"
          >
            ارسال الرسالة
          </Button>
        </DialogActions>
      </Dialog>

      <MaterialTable
        title="المستخدمين"
        data={users}
        columns={columns}
        options={{
          exportButton: { csv: true },
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
            icon: () => <WhatsAppIcon></WhatsAppIcon>,
            tooltip: "ارسال رسالة واتسب",
            onClick: (event, data) => {
              setUserPhoneNumber(data.phoneNumber);
              setWhatsappModal(true);
            },
          },
          {
            icon: "delete",
            tooltip: "حذف المستخدم",
            disabled: true,
            onClick: async (event, data) => {
              if (role === "super admin") {
                await deleteUser(data._id).catch(() => {
                  return;
                });
                setUsers(users.filter((user) => user._id !== data._id));
              }
            },
          },
        ]}
      />
    </div>
  ) : (
    <Redirect to="/dashboard" />
  );
}
