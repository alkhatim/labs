import OpenIcon from "@material-ui/icons/Launch";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAllApplications } from "../../redux/actions/applications_actions";

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
  const history = useHistory();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllApplications();
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
    <div style={{ margin: "50px", width: "75vw" }}>
      <MaterialTable
        title="طلبات الفحص"
        data={applications}
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
            exportAriaLabel: "تحميل التقرير",
            nRowsSelected: " لقد قمت باختيار {0} عميل",
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
