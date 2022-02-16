import "./item.css";

const ListItem = ({ style }) => {
  return (
    <div className="list-card">
      <div className="cards d-flex flex-wrap justify-content-between">
        <div className="card card-list" style={style}>
          <div className="card-header">
            <h4>Topics with multiple articles</h4>
          </div>
          <div className="card-body">
            <ul className="list-item">
              <li className="d-flex">
                <div className="w-100">
                  <i className="list-item-icon"></i>
                  <div className="d-flex justify-content-between">
                    <h6>Nguyen Minh Nha</h6>
                    <h6>109</h6>
                  </div>
                </div>
              </li>
              <li className="d-flex">
                <div className="w-100">
                  <i className="list-item-icon"></i>
                  <div className="d-flex justify-content-between">
                    <h6>Nguyen Minh Nha</h6>
                    <h6>109</h6>
                  </div>
                </div>
              </li>
              <li className="d-flex">
                <div className="w-100">
                  <i className="list-item-icon"></i>
                  <div className="d-flex justify-content-between">
                    <h6>Nguyen Minh Nha</h6>
                    <h6>109</h6>
                  </div>
                </div>
              </li>
              <li className="d-flex">
                <div className="w-100">
                  <i className="list-item-icon"></i>
                  <div className="d-flex justify-content-between">
                    <h6>Nguyen Minh Nha</h6>
                    <h6>109</h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="card card-list" style={style}>
          <div className="card-header">
            <h4>Authors with many articles</h4>
          </div>
          <div className="card-body">
            <div className="list-item-user">
              <div className="row align-items-center mb-4">
                <div className="col-3">
                  <img
                    src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                    alt=""
                  />
                </div>
                <div className="col-9 d-flex justify-content-between">
                  <h6>Nguyen Minh Nha</h6>
                  <h6>109</h6>
                </div>
              </div>
              <div className="row align-items-center mb-4">
                <div className="col-3">
                  <img
                    src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                    alt=""
                  />
                </div>
                <div className="col-9 d-flex justify-content-between">
                  <h6>Nguyen Minh Nha</h6>
                  <h6>109</h6>
                </div>
              </div>
              <div className="row align-items-center mb-4">
                <div className="col-3">
                  <img
                    src="https://d2eohwa6gpdg50.cloudfront.net/wp-content/uploads/sites/6/2021/08/16115025/white-rabbit-2-2.jpeg"
                    alt=""
                  />
                </div>
                <div className="col-9 d-flex justify-content-between">
                  <h6>Nguyen Minh Nha</h6>
                  <h6>109</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-list" style={style}>
          <div className="card-header">
            <h4> Authors with the most views</h4>
          </div>
          <div className="card-body">
            <ul className="list-item">
              <li className="d-flex">
                <div className="w-100">
                  <i className="list-item-icon"></i>
                  <div className="d-flex justify-content-between">
                    <h6>Nguyen Minh Nha</h6>
                    <h6>109</h6>
                  </div>
                </div>
              </li>
              <li className="d-flex">
                <div className="w-100">
                  <i className="list-item-icon"></i>
                  <div className="d-flex justify-content-between">
                    <h6>Nguyen Minh Nha</h6>
                    <h6>109</h6>
                  </div>
                </div>
              </li>
              <li className="d-flex">
                <div className="w-100">
                  <i className="list-item-icon"></i>
                  <div className="d-flex justify-content-between">
                    <h6>Nguyen Minh Nha</h6>
                    <h6>109</h6>
                  </div>
                </div>
              </li>
              <li className="d-flex">
                <div className="w-100">
                  <i className="list-item-icon"></i>
                  <div className="d-flex justify-content-between">
                    <h6>Nguyen Minh Nha</h6>
                    <h6>109</h6>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
