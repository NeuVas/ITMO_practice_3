import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';

const StyledCardHeader = withStyles({
    action: {
        margin: 0,
    },
})(CardHeader);

export default StyledCardHeader;
