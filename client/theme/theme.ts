import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Create a theme instance.
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#228d94',
		},
		secondary: {
			main: '#851966',
		},
		// error: {
		// 	main: red.A400,
		// },
		// background: {
		// 	default: '#fff',
		// },
	},
});

export default theme;
