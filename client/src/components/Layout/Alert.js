import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Alert = ({ alerts }) => {

    const alertList =  alerts !== null &&
        alerts.length > 0 &&
        alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.alertType}`} >
                {alert.msg}
            </div>
        ));

    return (
        <Fragment>
            {alertList}
        </Fragment>
    );
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);