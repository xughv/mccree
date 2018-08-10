import { connect as _connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { models } from './store';
import { awaitable } from './help';

export function connect(
	mapModelToProps,
	mapStateToProps,
	mapDispatchToProps,
	mergeProps = (m = {}, s = {}, d = {}, o = {}) => ({ ...m, ...s, ...d, ...o }),
	options,
) {

	return _connect(
		// mapStateToProps
		(state, ownProps) => {
			const modelsState = {};
			const props = mapStateToProps ? (mapStateToProps(state, ownProps) || {}) : {};

			Object.keys(models).forEach(name => {
				modelsState[name] = state[name] || {};
			});

			return {
				props,
				models: modelsState,
			}
		},

		// mapDispatchToProps
		(dispatch) => {
			const modelsActions = {};
			let props = {};
			if (typeof mapDispatchToProps === 'function') {
				props = mapDispatchToProps ? (mapDispatchToProps(dispatch) || {}) : {};
			}
			if (typeof mapDispatchToProps === 'object') {
				props = bindActionCreators(mapDispatchToProps, dispatch);
			}

			Object.keys(models).forEach(name => {
				const { actions = {}, actionCreators } = models[name];
				if (!actionCreators) {
					models[name].actionCreators = bindActionCreators(actions, dispatch);
				}
				modelsActions[name] = {};
				
				const creators = models[name].actionCreators;
				Object.keys(creators).forEach(action => {
					modelsActions[name][action] = awaitable(creators[action]);
				});
			});

			return {
				props,
				models: modelsActions,
			}
		},

		// mergeProps
		(stateProps, dispatchProps, ownProps) => {
			const propModels = {};
			const modelStateProps = stateProps.models, modelDispatchProps = dispatchProps.models;

			Object.keys(models).forEach(name => {
				propModels[name] = {
					...modelDispatchProps[name],
					state: modelStateProps[name] || {},
				}
			});
			const modelProps = mapModelToProps(propModels, ownProps);
			return mergeProps(modelProps, stateProps.props, dispatchProps.props, ownProps);
		},

		options
	);

}
