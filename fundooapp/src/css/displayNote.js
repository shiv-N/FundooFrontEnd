
export const useStyles = theme => ({
    
    card: {
        padding: '2px 0px',
        display: 'flex',
        flexDirection: 'column',
        width: 230,
        maxWidth: 230,
        boxShadow:'0.1em 0.1em 0.4em 0em grey',   
        marginRight:'1em',
        marginBottom:'1em',
        height:'fit-content'
      
    },
    icon: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
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