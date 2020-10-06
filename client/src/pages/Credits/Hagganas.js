import OpenIcon from "@material-ui/icons/Launch";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { getHagganas, doneHaggana } from "../../redux/actions/credits_actions";
import messages from "../../helpers/messages";
import { useSelector } from "react-redux";


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
    title: "المعمل",
    field: "lab",
  },
  {
    title: "مازن",
    field: "mazin",
  },
  {
    title: "منعم",
    field: "moniem",
  },
  {
    title: "التاريخ",
    field: "date",
  },
  {
    title: "خالص",
    field: "done",
  },
];

export default function Applications(props) {
  const classes = useStyles();
  const role = useSelector((store) => store.authReducer.role);

  const [hagganas, setHagganas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getHagganas();
      if (result) {
        setHagganas(result.map(hagg => ({...hagg, date: new Date(hagg.date).toLocaleDateString(), done: hagg.done? "خالص" : "غير خالص"})));
      }
    };
    fetchData();
  }, []);

  return (
    role === "admin" || role === "super admin" ?
    <div className={classes.layout} style={{ margin: "50px", width: "75vw" }}>
      <MaterialTable
        title="الحقوق"
        data={hagganas}
        columns={columns}
        options={{
          rowStyle: {
            backgroundColor: "#EEE",
          },
          exportButton: true,
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
            tooltip: "تخليص",
            onClick: async (event, data) => {
              if(role === "super admin"){
               const result = await doneHaggana(data._id);
                if (result) {
                  setHagganas(hagganas.map(hagg => hagg._id === data._id ? ({...hagg, done: "خالص"}) : {...hagg, done: "غير خالص"}))
                  messages.success("تمت العملية بنجاح");
                } 
              }
              else
              messages.error("غير مسموح بالعملية")
            },
          },
        ]}
      />
    </div> : <Redirect to="/dashboard"/>
  );
}
