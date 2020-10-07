import OpenIcon from "@material-ui/icons/Launch";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllPaidApplications } from "../../redux/actions/applications_actions";

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
    title: "الإسم",
    field: "name",
  },
  {
    title: "الحالة",
    field: "state",
  },
  {
    title: "نوع الفحص",
    field: "type",
  },
  {
    title: "رقم الهاتف",
    field: "phoneNumber",
  },
  {
    title: "رقم الجواز",
    field: "passportNumber",
  },
  {
    title: "الوجهة",
    field: "destination",
  },
  {
    title: "تاريخ الرحلة",
    field: "flightDate",
  },
  {
    title: "تاريخ الفحص",
    field: "testDate",
  },
];

export default function Applications(props) {
  const classes = useStyles();
  const history = useHistory();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllPaidApplications();
      if (result) {
        result.forEach((application) => {
          switch (application.state) {
            case "registered":
              application.state = "تم التسجيل";
              break;

            case "tested":
              application.state = "تم الفحص";
              break;

            case "result issued":
              application.state = "تم اصدار النتيجة";
              break;

            case "result delivered":
              application.state = "تم التسليم";
              break;
            default:
              break;
          }

          switch (application.type) {
            case "internal":
              application.type = "في المعمل";
              break;

            case "external":
              application.type = "عينة خارجية";
              break;
            default:
              break;
          }
        });
        setApplications(
          result.map((app) => ({
            ...app,
            flightDate: new Date(app.flightDate).toLocaleDateString(),
            testDate: new Date(app.testDate).toLocaleDateString(),
          }))
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className={classes.layout} style={{ margin: "50px", width: "75vw" }}>
      <MaterialTable
        title="طلبات الفحص"
        data={applications}
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
            tooltip: "تفاصيل الفحص",
            onClick: (event, data) => {
              history.push(`/application/${data._id}`);
            },
          },
        ]}
      />
    </div>
  );
}
