import {responsiveWidth} from '../../utils/util';
import AuthEditForm from '../../components/form/AuthEditForm';
import {SubLayout} from '../../components/layouts/SubLayout';

export default () => {
  return (
    <SubLayout style={{paddingHorizontal: responsiveWidth(20)}}>
      <AuthEditForm />
    </SubLayout>
  );
};
