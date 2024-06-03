import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  //   height: 300,
  //   bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  //   p: 2,
};

export default function ViewMark(subject) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    fetch();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [data, setData] = React.useState({});

  let [code, setSubCode] = React.useState("");

  const fetch = () => {
    // console.log(subject);
    setData(subject.subject);
    let sub = subject.subject.subjectName;
    setSubCode(sub.charAt(0) + 1001);
  };

  //   console.log(data.subject);
  //   console.log(code);
  return (
    <div>
      <button
        disabled={data.marks === undefined}
        className="btn btn-info ms-2"
        onClick={handleOpen}
      >
        View
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="bg-white shadow p-3 rounded border">
            <div className="card-header d-flex justify-content-center fw-bold ">
              Subject Details
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <span className="fw-bold ">Subject ID :</span>
                  <span className="ms-3">
                    {code}
                    {data.subjectId}
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <span className="fw-bold ">Name :</span>
                  <span className="ms-3">{data.subjectName}</span>
                </div>
              </div>
              {console.log(data.marks)}
              {data.marks !== undefined ? (
                <>
                  <div className="row">
                    <div className="col">
                      <span className="fw-bold ">Internal :</span>
                      <span className="ms-3">
                        {data.marks[0].internalPercentage / 2}
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <span className="fw-bold ">External :</span>
                      <span className="ms-3">
                        {data.marks[0].externalPercentage / 2}
                      </span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <span className="fw-bold ">Overall :</span>
                      <span className="ms-3">
                        {data.marks[0].overallResult}
                      </span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
