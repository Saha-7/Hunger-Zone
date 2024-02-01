import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };
    console.log(this.props.name + "Child Constructor");
  }

  async componentDidMount() {
    //console.log(this.props.name + "Child Component Did Mount");
    // Api call

    const data = await fetch("https://api.github.com/users/saha-7");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });

    //console.log(json);
  }

  componentDidUpdate() {
    //console.log("Component Did Update");
  }

  componentWillUnmount() {
    //console.log("Component Will Unmount");
  }

  render() {
   // console.log(this.props.name + "Child Render");

    const { name, location, avatar_url, twitter_username } = this.state.userInfo;
    return (
      <div className="user-card text-center flex flex-col items-center">
        <img src={avatar_url} alt="photo" className="justify-center rounded-full m-4 p-4" />
        <h2 className="text-2xl font-extrabold p-2 m-2">Name: {name}</h2>
        <h3 className="text-xl font-bold">Location: {location}</h3>
        <h4 className="text-lg font-semibold p-2 m-2">Twitter: @{twitter_username}</h4>
      </div>
    );
  }
}

export default UserClass;

/****
 *
 * --- MOUNTING ----
 *
 * Constructor (dummy)
 * Render (dummy)
 *      <HTML Dummy >
 * Component Did MOunt
 *      <API Call>
 *      <this.setState> -> State variable is updated
 *
 * ---- UPDATE
 *
 *      render(APi data)
 *      <HTML (new API data>)
 *      ccomponentDid Update
 *
 *
 *
 *
 */