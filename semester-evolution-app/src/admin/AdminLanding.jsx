import React, { useEffect, useRef } from "react";

const AdminLanding = () => {
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <>
      <div
        className="container-fluid main-container d-flex flex-column adm-view"
        style={{ marginTop: "2%" }}
      >
        <div className="">
          <video
            className="m-2 rounded object-fit-cover"
            id="videoCover"
            playsInline
            loop
            muted
            // controls
            alt="All the devices"
            src="https://v.ftcdn.net/06/50/91/97/700_F_650919796_zUjbxamULhApdDzHZQAJJo4OECYko6iQ_ST.mp4"
            ref={videoEl}
          />
          <h3>Our Motto</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore
            quidem maiores illo, labore laudantium dolore velit corporis itaque
            vero aperiam numquam architecto voluptates sed, doloribus quisquam
            enim atque pariatur quos. Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Blanditiis quia, impedit commodi unde veniam
            exercitationem corrupti consequuntur atque labore, cupiditate soluta
            repudiandae, dicta delectus sit molestiae explicabo deserunt quis
            asperiores! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Possimus quam ipsa quasi iure repellendus nostrum magni repellat
            fuga, quam, tenetur laboriosam praesentium dolore
          </p>
        </div>

        <div style={{ marginTop: "10%" }}>
          <h3
            className="fw-bold position-relative"
            style={{ display: "flex", whiteSpace: "nowrap", top: "-10px" }}
          >
            <hr
              className="border border-dark me-2"
              style={{ width: "100%", marginLeft: "10px" }}
            />
            Gallery{" "}
            <hr
              className="border border-dark"
              style={{ width: "100%", marginLeft: "10px" }}
            />
          </h3>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="col">
              <div className="card h-100">
                <img
                  src="https://t3.ftcdn.net/jpg/03/11/41/32/240_F_311413288_1SR4YuYaAxVaXDQ304xSyzRa3IJC44zv.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Lab</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img
                  src="https://t3.ftcdn.net/jpg/03/11/41/32/240_F_311413288_1SR4YuYaAxVaXDQ304xSyzRa3IJC44zv.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Library</h5>
                  <p className="card-text">This is a short card.</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img
                  src="https://t3.ftcdn.net/jpg/03/11/41/32/240_F_311413288_1SR4YuYaAxVaXDQ304xSyzRa3IJC44zv.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Canteen</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img
                  src="https://t3.ftcdn.net/jpg/03/11/41/32/240_F_311413288_1SR4YuYaAxVaXDQ304xSyzRa3IJC44zv.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Ground</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img
                  src="https://t3.ftcdn.net/jpg/03/11/41/32/240_F_311413288_1SR4YuYaAxVaXDQ304xSyzRa3IJC44zv.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Department</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img
                  src="https://t3.ftcdn.net/jpg/03/11/41/32/240_F_311413288_1SR4YuYaAxVaXDQ304xSyzRa3IJC44zv.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">Academic & Research</h5>
                  <p className="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <footer className="">
          <p className="fw-bold mt-3">Copyright &copy;kcet 2024</p>
        </footer>
      </div>
    </>
  );
};

export default AdminLanding;
