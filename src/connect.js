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
			const map = mapModelToProps(models);
			const modelsStates = {};

			Object.keys(map).forEach(key => {
				const { name } = (map[key] || {});
				name && (modelsStates[key] = state[name]);
			});

			return modelsStates;
		},

		// mapDispatchToProps
		(dispatch) => {
			const map = mapModelToProps(models);
			const modelsActions = {};

			Object.keys(map).forEach(key => {
				const { actions = {} } = (map[key] || {});
				modelsActions[key] = bindActionCreators(actions, dispatch);
			});

			return modelsActions;
		},

		// mergeProps
		(stateProps, dispatchProps) => {
			const models = {};

			Object.keys(dispatchProps).forEach(key => {
				models[key] = {
					...dispatchProps[key],
					state: stateProps[key] || {},
				};
			});

			return { ...models }
		}
	);

}
