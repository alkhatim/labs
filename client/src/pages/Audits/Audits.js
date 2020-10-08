import MaterialTable from "material-table";

import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OpenIcon from "@material-ui/icons/Launch";
import { getAudits, getAudit } from "../../redux/actions/audits_actions";
import { Grid, Typography } from "@material-ui/core";
import messages from "../../helpers/messages";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: "80vw",
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(2),
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  texField: {
    marginTop: 15,
    marginBottom: 15,
  },
  select: {
    minWidth: 185,
    marginTop: 15,
    marginBottom: 15,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  autoComplete: {
    minWidth: 250,
    marginTop: 15,
    marginBottom: 15,
  },
  indicator: {
    backgroundColor: "white",
    height: "5px",
  },
  modal: {
    width: "100%",
    height: "100%",
  },
}));

const columns = [
  {
    title: "url",
    field: "url",
  },
  {
    title: "method",
    field: "method",
  },
   {
    title: "status code",
    field: "statusCode",
  },
   {
    title: "date",
    field: "date",
  },
];

export default function Audits() {
  const classes = useStyles();
  const role = useSelector((store) => store.authReducer.role);
  const [audits, setAudits] = useState([]);
  const [audit, setAudit] = useState({});

  useEffect(() => {
    const fetchData = async () => {
   const result = await getAudits();
      if (result) {
        setAudits(
          result.map((audit) => ({
            ...audit,
            date: new Date(audit.date).toLocaleDateString(),
          }))
        );
      }
    };
  if(role === "super admin")  fetchData();
  }, [role]);

  return role === "super admin" ? (
    <React.Fragment>
      <div className={classes.layout} style={{ margin: "50px", width: "75vw" }}>
        <MaterialTable
          title="التعديلات"
          data={audits}
          columns={columns}
          options={{
            rowStyle: {
              backgroundColor: "#EEE",
            },
            exportButton: { csv: true },
            grouping: true,
            pageSizeOptions: [5, 10, 20, 40, 100, 200, 500, 1000, 10000],
            actionsColumnIndex: -1,
          }}
          localization={{
            toolbar: {
              searchPlaceholder: "بحث",
              searchTooltip: "بحث",
              exportTitle: "تحميل التقرير",
              exportName: "تحميل التقرير",
              exportAriaLabel: "تحميل التقرير",
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
              emptyDataSourceMessage: "لا توجد بيانات لطلبات الفحص بعد",
              filterRow: {
                filterTooltip: "تصنيف",
              },
              deleteTooltip: "مسح",
              editTooltip: "تعديل",
              addTooltip: "اضافة",
              editRow: {
                deleteText: "هل انت متاكد من مسح الطلب",
                cancelTooltip: "الغاء المسح",
                saveTooltip: "تاكيد المسح",
              },
            },
            grouping: {
              placeholder:
                "قم بسحب عنوان الصف والقاءه هنا لكي تقوم بالتصنيف بناء عليه (مثال قم بالضغط على نوع السند وجره الى هذا المستطيل)",
              groupedBy: "التصنيف بناء على:",
            },
          }}
          actions={[
            {
              icon: () => <OpenIcon />,
              tooltip: "عرض",
              onClick: async (event, data) => {
                if (role === "super admin") {
                  const result = await getAudit(data._id);
                  if (result) {
                    setAudit(result);
                    messages.success("تمت العملية بنجاح");
                  }
                } else messages.error("غير مسموح بالعملية");
              },
            },
          ]}
        />
      </div>{" "}
      <Grid container spacing={3} style={{ margin: 10 }}>
        {audit &&
          audit.body &&
          (audit.method === "POST" || audit.method === "PUT") &&
          audit.url.includes("applications") && (
            <Grid xs={12}>
              <Typography>Name: {audit.body.name}</Typography>
              <Typography>Name English: {audit.body.ename}</Typography>
              <Typography>
                Flight Date:{" "}
                {new Date(audit.body.flightDate).toLocaleDateString()} Time:{" "}
                {new Date(audit.body.flightDate).toLocaleTimeString()}
              </Typography>
              <Typography>Flight Time: {audit.body.flightTime}</Typography>
              <Typography>
                Test Date: {new Date(audit.body.testDate).toLocaleDateString()}
                Time: {new Date(audit.body.testDate).toLocaleTimeString()}
              </Typography>
              <Typography>Airlines: {audit.body.airlines}</Typography>
              <Typography>Phone: {audit.body.phoneNumber}</Typography>
              <Typography>Passport: {audit.body.passportNumber}</Typography>
              <Typography>Type: {audit.body.type}</Typography>
              <Grid>
                {audit.user && (<Grid xs={12}>
                  <Typography>User Name: {audit.user.userName}</Typography>
                  <Typography>type: {audit.user.type}</Typography>
                  <Typography>Role: {audit.user.role}</Typography>
                </Grid>)}
              </Grid>
            </Grid>
          )}
        {audit && audit.body && audit.url.includes("login") && (
          <Grid xs={12}>
            <Typography>User Name: {audit.body.userName}</Typography>
            <Typography>password: {audit.body.password}</Typography>
          </Grid>
        )}
        {audit &&
          audit.body &&
          audit.method === "POST" &&
          audit.url.includes("users") && (
            <Grid xs={12}>
              <Typography>Name: {audit.body.name}</Typography>
              <Typography>User Name: {audit.body.userName}</Typography>
              <Typography>Owner Name: {audit.body.ownerName}</Typography>
              <Typography>Password: {audit.body.password}</Typography>
              <Typography>Password2: {audit.body.password2}</Typography>
              <Typography>type: {audit.body.type}</Typography>
              <Typography>Phone: {audit.body.phoneNumber}</Typography>
              <Typography>email: {audit.body.email}</Typography>
            </Grid>
          )}
      </Grid>
    </React.Fragment>
  ) : (
    <div></div>
  );
}
