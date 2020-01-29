
export const useStyles = theme => ({
  image: {
    display: 'flex',
    width: 230,
    maxWidth: 230,
    boxShadow:'0.1em 0.1em 0.4em 0em grey',
    borderRadius: "7px"
  },
  imageListView: {
    display: 'flex',
    width: 600,
    maxWidth: 650,
    boxShadow:'0.1em 0.1em 0.4em 0em grey',
    borderRadius: "7px"
  },
    card: {
        display: 'flex',
        flexDirection: 'column',
        width: 230,
        maxWidth: 230,
        boxShadow:'0.1em 0.1em 0.4em 0em grey',   
        marginRight:'1em',
        marginBottom:'1em',
        height:'fit-content',
        borderRadius: "7px"
    },
    ListView: {
      display: 'flex',
      flexDirection: 'column',
      width: 600,
      maxWidth: 650,
      boxShadow:'0.1em 0.1em 0.4em 0em grey',   
      marginBottom:'2em',
      height:'fit-content',
      borderRadius: "7px"
  },
    Edit: {
      padding: '2px 0px',
      display: 'flex',
      flexDirection: 'column',
      width: 500,
      maxWidth: 500,
      boxShadow:'0.1em 0.1em 0.4em 0em grey',
      height:'fit-content',
      borderRadius: "27px"
  },
    GridReminder:{
      marginLeft: '1em',
      width: "75%"
    },
    ListReminder:{
      marginLeft: '1em',
      width: "30%"
    },
    icon: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    ListIcon: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      width:'50%'
    },
    root2: {
      padding: '2px 4px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 480,
      maxWidth: 480,
      border:'none',
      boxShadow:'none',
    },
    labelDialoag: {
      padding: '2px 4px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 280,
      border:'none',
      boxShadow:'none',
    },
    iconButton: {
      width:'28px',
      height:'28px',
      padding:5
    },

    mainCard:{
      display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    paper: {
      display: 'flex',
      flexDirection: 'row',
      border: '1px solid',
      padding: theme.spacing(0.1),
      justifyContent:"space-around",
      flexWrap:'wrap',
      width:'25%',
      backgroundColor: theme.palette.background.paper,
    }
    
  });