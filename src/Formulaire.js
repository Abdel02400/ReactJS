import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
	},
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit * 1,
  },
  group: {
  	display: 'flex',
  	flexDirection: 'row',
    margin: `${theme.spacing.unit}px 0`,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  erreur: {
    color: 'red',
  }
});

const emailRegex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,3}$/;
const telRegex = /^(06|07)[0-9]{8}$/;
const alphaOnlyRegex = /^[A-Za-z]+$/;
const dateRegex = /(\d+)(-|\/)(\d+)(?:-|\/)(?:(\d+)\s+(\d+):(\d+)(?::(\d+))?(?:\.(\d+))?)?/;

class Formulaire extends React.Component {

  state = {
    civilite: "MME",
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    date: "",
    erreurNom: "",
    erreurPrenom: "",
    erreurEmail: "",
    erreurTel: "",
    erreurDate: "",
  };

   handleChange = e => {
    this.setState({ civilite: e.target.value });
   };

   Change = e => {

    this.setState({ 
      [e.target.name]: e.target.value,
      erreurNom: "",
      erreurPrenom: "",
      erreurEmail: "",
      erreurTel: "",
      erreurDate: "",
    });
  };

  onSubmit = e => {

      if( (!alphaOnlyRegex.test(this.state.nom)) || (!alphaOnlyRegex.test(this.state.prenom)) || (!emailRegex.test(this.state.email)) || (!telRegex.test(this.state.tel)) || (!dateRegex.test(this.state.date)) ) {
        
          if( (!alphaOnlyRegex.test(this.state.nom)) ){
            e.preventDefault();
            this.setState({ 
              erreurNom: "le nom doit être uniquement composer de lettres",
            });
          }
          if( (!alphaOnlyRegex.test(this.state.prenom)) ){
            e.preventDefault();
            this.setState({ 
              erreurPrenom: "le prénom doit être uniquement composer de lettres",
            });
          }
          if( (!emailRegex.test(this.state.email)) ){
            e.preventDefault();
            this.setState({ 
              erreurEmail: "l'email est invalide",
            });
          }
          if( (!telRegex.test(this.state.tel)) ){
            e.preventDefault();
            this.setState({ 
              erreurTel: "le numéro est invalide",
            });
          }
          if( (!dateRegex.test(this.state.date)) ){
            e.preventDefault();
            this.setState({ 
              erreurDate: "la date est invalide",
            });
          }

      }
      else{
        e.preventDefault();
        this.props.onSubmit(this.state);

        this.setState({
          civilite: "MME",
          nom: "",
          prenom: "",
          email: "",
          tel: "",
          date: "",
        });
      }
  };


  render() {
    const { classes } = this.props;

    return (

    	<React.Fragment>

    		<CssBaseline />
    		<main className={classes.layout}>

    			<Paper className={classes.paper}>

    				<Typography variant="headline">Formulaire MOSAIC</Typography>
    				<form className={classes.form}>

	    				<FormControl component="fieldset" className={classes.formControl}>
					          <RadioGroup
					            aria-label="Gender"
					            name="civilite"
					            className={classes.group}
					            value={this.state.civilite}
					            onChange={e => this.handleChange(e) }
					          >
						            <FormControlLabel value="MME" control={<Radio color="primary" />} label="MME" />
						            <FormControlLabel value="M" control={<Radio color="primary" />} label="M" />
					          </RadioGroup>
					    </FormControl>
					    <FormControl margin="normal" required fullWidth>
						    <InputLabel type="text" htmlFor="nom" >Nom</InputLabel>
						    <Input id="nom" value={this.state.nom} onChange={e => this.Change(e) } name="nom" />
                <span className={classes.erreur}>{this.state.erreurNom}</span>
						</FormControl>
						<FormControl margin="normal" required fullWidth>
						    <InputLabel htmlFor="prenom">Prénom</InputLabel>
						    <Input id="prenom" value={this.state.prenom} onChange={e => this.Change(e) } name="prenom" />
                <span className={classes.erreur}>{this.state.erreurPrenom}</span>
						</FormControl>
						<FormControl margin="normal" required fullWidth>
						    <InputLabel htmlFor="email">Email</InputLabel>
						    <Input id="email" value={this.state.email} onChange={e => this.Change(e) } name="email" />
                <span className={classes.erreur}>{this.state.erreurEmail}</span>
						</FormControl>
						<FormControl margin="normal" required fullWidth>
						    <InputLabel htmlFor="tel">Téléphone</InputLabel>
						    <Input id="tel" value={this.state.tel} onChange={e => this.Change(e) } name="tel" />
                <span className={classes.erreur}>{this.state.erreurTel}</span>
						</FormControl>
						<FormControl margin="normal" required fullWidth>
						    <InputLabel htmlFor="date">Date</InputLabel>
						    <Input id="date" value={this.state.date} onChange={e => this.Change(e) } name="date" />
                <span className={classes.erreur}>{this.state.erreurDate}</span>
						</FormControl>
						<Button
						    type="submit"
						    fullWidth
						    variant="raised"
						    color="primary"
						    className={classes.submit}
						    onClick={e => this.onSubmit(e)}
						   >
						    SAUVEGARDE
						</Button>

				    </form>
				       
    			</Paper> 

      		</main>
    	</React.Fragment>
    );
  }
}

Formulaire.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Formulaire);