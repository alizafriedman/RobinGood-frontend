import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 150,
        display: "flex",
        justifyContent: "flex-end",
        margin: "auto"
    },
    // bullet: {
    //     display: 'inline-block',
    //     margin: '0 2px',
    //     transform: 'scale(0.8)',
    // },
    title: {
        fontSize: 20,
    },
    // pos: {
    //     marginBottom: 12,
    // },
});

function DemoCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Hi! To log in as a demo user, please select the demo login option at log in <br />
           <br />
           You can search for a particular charity by EIN or keyword, <br />
                     by using the search option above.   <br />
                    <br />
                    Each graph displays important charity financials; you can view<br />
                    additional charity info such as website, location etc <br />
                    and save their information to your account as well
        </Typography>
                {/* <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
        </Typography> */}
                {/* <Typography className={classes.pos} color="textSecondary">
                    adjective
        </Typography> */}
                {/* <Typography variant="body2" component="p">
                    well meaning and kindly.
          <br />
                    {'"a benevolent smile"'}
                </Typography> */}
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}

export default DemoCard;