import { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { oldChangeUsersAge } from './common/redux/actions/oldChangeUsersAge';
import { oldChangeUsersName } from './common/redux/actions/oldChangeUsersName';

type OldAppType = {
  changeNameAction?: (name: string) => void;
  nameFromConnect?: string;
};

function OldApp({ changeNameAction, nameFromConnect }: OldAppType) {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.name);
  
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="App">
      <h1>Redux reducer</h1>
      <hr></hr>
      <h1>Name: {user.name}</h1>
      <h1>Age: {user.age}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(oldChangeUsersName(name));
          dispatch(oldChangeUsersAge(age));
        }}
      >
        <input
          ref={ref}
          onChange={(e) => setName(e.target.value)}
          placeholder="Change name"
        />
        <input
          onChange={(e) => setAge(e.target.value)}
          placeholder="Change age"
        />
        <input type="submit" value="Change user details" />
        <br />
        name via connect: {nameFromConnect}
        <button
          type="button"
          style={{ marginLeft: 10 }}
          onClick={() => {
            changeNameAction?.(name);
          }}
        >
          change name via connect action
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    nameFromConnect: state.user.name,
  };
};

const mapDispatchToProps = {
  changeNameAction: oldChangeUsersName,
};

const connectToStore = connect(mapStateToProps, mapDispatchToProps);
export default connectToStore(OldApp);

// export default connect(null, { changeNameAction: oldChangeUsersName })(OldApp);
// export default OldApp;
