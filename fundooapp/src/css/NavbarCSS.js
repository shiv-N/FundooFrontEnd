
export const useStyles = theme => ({
    appBar:{
        display:'flex',
        position:'relative',
        justifyContent: 'space-between',
        boxShadow:'none',
        borderBottom:'1px solid lightgray',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: '20px',
    },
    title: {
        display:'flex',
       
    },
    search: {
        display: 'flex',
        position: 'absolute',
        background: '#f1f3f4',
        border: '1px solid red',
        alignItems:'center',
        marginRight: '1em',
        marginLeft: '12em',
        width: '30%',
        
    },
    searchIcon: {
        width: '40px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: '10px 10px 10px 10px',
        width: '200px',

    },
    list: {
        width: 240,
    },
    drawer: {
        '& .MuiDrawer-paper': {
            top: '4.08em'
        }
    },
    root: {
        padding: '1px 3px',
        display: 'flex',
        justifyself:'none',
        marginRight: '14em',
        marginLeft: '12em',
        minWidth:'40%',
        boxShadow:'0.1em 0.1em 0.4em 0em grey',
       
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      }
});
