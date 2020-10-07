import OpenIcon from "@material-ui/icons/Launch";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAudits } from "../../redux/actions/audits_actions";

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

export default function Applications(props) {
  const classes = useStyles();
  const history = useHistory();

  const [audits, setAudits] = useState([]);
  const role = useSelector((store) => store.authReducer.role);

  useEffect(() => {
    const fetchData = async () => {
   if(role === "super admin")   {const result = await getAudits();
      if (result) {
        setAudits(
          result.map((audit) => ({
            ...audit,
            date: new Date(audit.date).toLocaleDateString(),
          }))
        );
      }}
    };
    fetchData();
  }, []);

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
        />
      </div>{" "}
    </React.Fragment>
  ) : (
    <Redirect to="/dashboard" />
  );
}
