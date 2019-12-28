// import React, { Component } from "react";
// import Header from "../../components/Header";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { getCategory } from "../../_actions/category";
// class Category extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { variable: 0 };
//   }

//   componentDidMount() {
//     this.props.getCategory();
//   }

//   render() {
//     const { category } = this.props.category;
//     return (
//       <div>
//         <Header />
//         {console.log(category)}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     category: state.category
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     getCategory: () => {
//       dispatch(getCategory());
//     }
//   };
// };

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(Category)
// );
import React, { Component } from "react";

class pageLoaging extends Component {
  constructor(props) {
    super(props);
    this.state = { variable: 0 };
  }

  render() {
    return <div>sadasd</div>;
  }
}

export default pageLoaging;
