import React from 'react';
import PropTypes from 'prop-types';

import {i18n} from 'hub-dashboard-addons/dist/localization';

import Input from '@jetbrains/ring-ui/components/input/input';
import ConfigurationForm from '@jetbrains/hub-widget-ui/dist/configuration-form';
import RefreshPeriod from '@jetbrains/hub-widget-ui/dist/refresh-period';
import ServiceSelect from '@jetbrains/hub-widget-ui/dist/service-select';

const refreshLabel = minutes => i18n('{{minutes}} min', {minutes});
const refreshTooltip = minutes => (minutes === 1
  ? i18n('Widget refreshes every minute')
  : i18n('Widget refreshes every {{minutes}} minutes', {minutes}, minutes));

const Configuration = (
  {
    refreshPeriod,
    onRefreshPeriodUpdate,

    title,
    onTitleChange,

    isLoadingServices,
    selectedService,
    serviceList,
    serviceNotFoundMessage,
    onServiceSelect,

    onSave,
    onCancel
  }
) => (
  <ConfigurationForm
    saveButtonLabel={i18n('Save')}
    onSave={onSave}

    cancelButtonLabel={i18n('Cancel')}
    onCancel={onCancel}

    panelControls={[(
      <RefreshPeriod
        key="refresh"
        seconds={refreshPeriod}
        label={refreshLabel}
        tooltip={refreshTooltip}
        onChange={onRefreshPeriodUpdate}
      />
    )]}
  >
    <Input
      label={i18n('Optional title')}
      data-test="widget-name-input"
      value={title}
      onChange={onTitleChange}
    />

    <ServiceSelect
      isLoading={isLoadingServices}
      placeholder={i18n('Select service')}
      selectedService={selectedService}
      serviceList={serviceList}
      loadError={serviceNotFoundMessage}
      onServiceSelect={onServiceSelect}
    />
  </ConfigurationForm>
);

Configuration.propTypes = {
  refreshPeriod: PropTypes.number.isRequired,
  onRefreshPeriodUpdate: PropTypes.func.isRequired,

  title: PropTypes.string,
  onTitleChange: PropTypes.func.isRequired,

  isLoadingServices: PropTypes.bool.isRequired,
  selectedService: PropTypes.object,
  serviceList: PropTypes.array,
  serviceNotFoundMessage: PropTypes.string,
  onServiceSelect: PropTypes.func.isRequired,

  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default Configuration;
