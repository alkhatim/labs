import DateFnsUtils from "@date-io/date-fns";
import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import PaymentIcon from "@material-ui/icons/Payment";
import messages from "../../helpers/messages";
import {
  labPaid,
  applicationsByDates,
} from "../../redux/actions/applications_actions";

export default function WalletTransactionsDate(props) {
  const role = useSelector((store) => store.authReducer.role);

  const [applications, setApplications] = useState([]);
  const [paymentsDetails, setPaymentsDetails] = useState({
    mazin: "",
    moniem: "",
    lab: "",
    labDebit: "",
  });
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleStartDateChange = (startDate) => {
    setDates({ ...dates, startDate });
  };

  const handleEndDateChange = (endDate) => {
    setDates({ ...dates, endDate });
  };

  const handleDateChange = async () => {
    const result = await applicationsByDates(dates);
    if (result) {
      console.log(result);
      setPaymentsDetails({
        lab: result.lab,
        moniem: result.moniem,
        mazin: result.mazin,
        labDebit: result.labDebit,
      });
      setDates({
        startDate: new Date(),
        endDate: new Date(),
      });
      result.data.forEach((application) => {
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
        result.data.map((app) => ({
          ...app,
          flightDate: new Date(app.flightDate).toLocaleDateString(),
          testDate: new Date(app.testDate).toLocaleDateString(),
        }))
      );
    }
  };

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

  const handleLabPaid = {
    icon: () => <PaymentIcon />,
    tooltip: "تم السداد من قبل المعمل",
    onClick: async (event, data) => {
      if (role === "admin" || role === "super admin") {
        const paymentsSucceeded = await labPaid(data);
        setApplications([]);
        if (paymentsSucceeded) messages.success("تم تسجيل الدفعيات من المعمل");
      }
    },
  };

  return role === "admin" || role === "super admin" ? (
    <React.Fragment>
      <div style={{ margin: "20px" }}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom align="center">
              الفحوصات حسب التاريخ
            </Typography>
            <div style={{ width: "1200px", marginRight: "50px" }}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
                xs={12}
              >
                <Grid item xs={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        disableFuture
                        label="من تاريخ"
                        value={dates.startDate}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          marginRight: 20,
                          marginTop: 35,
                          color: "gray",
                        }}
                      >
                        يجب تحديد تاريخ الذي تريد بدء البحث منه
                      </span>
                    </div>
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        label="الى تاريخ"
                        value={dates.endDate}
                        onChange={handleEndDateChange}
                        name="passportExpirateDate"
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          marginRight: 20,
                          marginTop: 35,
                          color: "gray",
                        }}
                      >
                        يجب تحديد تاريخ نهاية البحث
                      </span>
                    </div>
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid
                  //   container
                  //   direction="row"
                  //   justify="center"
                  //   alignItems="center"
                  //   spacing={3}
                  item
                  xs={4}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDateChange}
                  >
                    البحث حسب التواريخ
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom align="center">
                جملة الايرادات للمعمل:{" "}
                {paymentsDetails.lab ? paymentsDetails.lab : ""}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom align="center">
                جملة مطالباتنا من المعمل:{" "}
                {paymentsDetails.labDebit ? paymentsDetails.labDebit : ""}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom align="center">
                جملة مطالبات منعم :{" "}
                {paymentsDetails.moniem ? paymentsDetails.moniem : ""}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom align="center">
                جملة مطالبات مازن :{" "}
                {paymentsDetails.mazin ? paymentsDetails.mazin : ""}
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <div style={{ margin: "50px" }}>
              <MaterialTable
                title="تقرير المعمل الدوري"
                columns={columns}
                data={applications}
                options={{
                  rowStyle: {
                    backgroundColor: "#EEE",
                  },
                  exportButton: true,
                  grouping: true,
                  selection: true,
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
                    emptyDataSourceMessage: "لا توجد بيانات للسندات",
                    filterRow: {
                      filterTooltip: "تصنيف",
                    },
                    deleteTooltip: "مسح",
                    editTooltip: "تعديل",
                    addTooltip: "اضافة",
                    editRow: {
                      deleteText: "هل انت متاكد من مسح السند؟",
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
                actions={
                  ["admin", "super admin"].includes(role) && [handleLabPaid]
                }
              />
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  ) : (
    <Redirect to="/dashboard" />
  );
}
