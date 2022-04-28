import Card from "./Card";

function UserList({ users }) {
  return (
    <>
      {users.map((user, index) => (
        <Card key={index} user={user} />
      ))}
    </>
  );
}

export default UserList;
