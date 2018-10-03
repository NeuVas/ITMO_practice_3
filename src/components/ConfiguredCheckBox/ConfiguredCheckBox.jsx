import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';

const ConfiguredCheckBox = ({
    id, text, isInProgress, onStatusChange,
}) => (
    <Checkbox
        checked={isInProgress}
        onChange={onStatusChange({ id, text, isInProgress })}
        color="primary"
    />
);

ConfiguredCheckBox.propTypes = {
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isInProgress: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func.isRequired,
};

export default ConfiguredCheckBox;
