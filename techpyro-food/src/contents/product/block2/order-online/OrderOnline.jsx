// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//     display: 'flex',
//     height: '100%',
//   },
//   tabs: {
//     borderRight: `1px solid ${theme.palette.divider}`,
//     minWidth: 200,
//   },
//   tabPanel: {
//     flex: 1,
//     padding: theme.spacing(2),
//   },
// }));

// const OrderOnline = ({ tabs }) => {
//   const classes = useStyles();
//   const [activeTab, setActiveTab] = useState(0);

//   const handleChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   return (
//     <div className={classes.root}>
//       <Tabs
//         orientation="vertical"
//         variant="scrollable"
//         value={activeTab}
//         onChange={handleChange}
//         className={classes.tabs}
//       >
//           <Tab key={index} label={tab.label} />

//       </Tabs>
//       <div className={classes.tabPanel}>
      
//       </div>
//     </div>
//   );
// };

// export default OrderOnline;
