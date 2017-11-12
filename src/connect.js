import { connect as _connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { models } from './store';

export function connect(mapModelToProps = ({}) => ({})) {

  if (typeof mapModelToProps !== 'function') {
    throw new Error('mapModelToProps is must be a function');
	}

	return _connect(
		// mapStateToProps
		(state, ownProps) => {
			const modelsStates = {};

			Object.keys(models).forEach(name => {
				modelsStates[name] = state[name] || {};
			});

			return modelsStates;
		},

		// mapDispatchToProps
		(dispatch) => {
			const modelsActions = {};

			Object.keys(models).forEach(name => {
				const { actions = {} } = models[name];
				modelsActions[name] = bindActionCreators(actions, dispatch);
			});

			return modelsActions;
		},

		// mergeProps
		(stateProps, dispatchProps) => {
			const propModels = {};
			Object.keys(models).forEach(name => {
				propModels[name] = {
					...dispatchProps[name],
					state: stateProps[name] || {},
				}
			});
			return mapModelToProps(propModels);
		}
	);

}
