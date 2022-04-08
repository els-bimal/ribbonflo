import React from 'react';
import GridContainer from '../../../@jumbo/components/GridContainer';
import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Grid from '@material-ui/core/Grid';
import SidebarButtons from '../../../@jumbo/components/AppLayout/partials/SideBar/SIdebarButtons';
import Divider from '@material-ui/core/Divider';

const breadcrumbs = [
  { label: <IntlMessages id={'sidebar.system'} />, link: '/' },
  { label: <IntlMessages id={'pages.admin.time.clock'} />, isActive: true },
];

const TimeClock = () => {
  return (
    <PageContainer heading={<IntlMessages id="pages.admin.time.clock" />} breadcrumbs={breadcrumbs}>
      <GridContainer>
        <Grid item xs={12}>
          <div style={{ marginBottom: 10 }}>
            <IntlMessages id="pages.admin.time.clocks" />
          </div>
          <Divider />
          <div style={{ marginTop: 24 }}>
            <h3>Time Clock</h3>
            <SidebarButtons />
          </div>
        </Grid>
      </GridContainer>
    </PageContainer>
  );
};

export default TimeClock;
