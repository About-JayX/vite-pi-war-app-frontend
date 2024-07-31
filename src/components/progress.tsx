import { createStyles, LinearProgress,type Theme, withStyles } from "@material-ui/core";

export default function Progress(){
    const BorderLinearProgress = withStyles((theme: Theme) =>
        createStyles({
          root: {
            height: 10,
            borderRadius: 5,
          },
          colorPrimary: {
            backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
          },
          bar: {
            borderRadius: 5,
            backgroundColor: '#1a90ff',
          },
        }),
      )(LinearProgress);
    return <BorderLinearProgress variant="determinate" value={50}/>
}