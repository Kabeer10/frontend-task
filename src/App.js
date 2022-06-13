import "./App.css";
import {
  addUsers,
  nextPage,
  useGetUsersQuery,
  useGetSingleUsersQuery,
  setId,
} from "./redux/usersSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();

  // -----------STATE------------------
  const page = useSelector((state) => state.usersData.page);
  const users = useSelector((state) => state.usersData.users);
  const totalPages = useSelector((state) => state.usersData.totalPages);
  const loading = useSelector((state) => state.usersData.loading);
  const selectedUserId = useSelector((state) => state.usersData.selectedUserId);

  const { data, isLoading, error } = useGetUsersQuery(page);
  const { data: user, isLoading: userLoading } =
    useGetSingleUsersQuery(selectedUserId);

  useEffect(() => {
    if (!isLoading && !error) {
      console.log(data.data);
      dispatch(addUsers({ users: data.data, totalPages: data.total_pages }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, error, data]);

  return loading ? (
    <div className="loader_container">
      <h1>Loading ... </h1>
      <div id="loader"></div>
    </div>
  ) : (
    <div className="container">
      <div className="container_inner">
        <div className="glass">
          {!userLoading ? (
            user ? (
              <UserComp user={user.data} />
            ) : (
              <h1>Select an User ID to display info</h1>
            )
          ) : (
            <div id="loader"></div>
          )}
        </div>
      </div>
      <div className="btns">
        {users.map((_, i) => {
          return (
            <button
              onClick={() => dispatch(setId(_.id))}
              type="button"
              key={_.id}
              className={`page_number ${selectedUserId === _.id && "selected"}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      {page < totalPages && (
        <button
          type="button"
          className="load_more"
          onClick={() => dispatch(nextPage())}
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default App;

const UserComp = ({ user }) => (
  <div className="info">
    <img src={user.avatar} alt="profile" />
    <p>
      <b>{`${user.first_name} ${user.last_name}`}</b>
    </p>
    <p>{user.email}</p>
  </div>
);
