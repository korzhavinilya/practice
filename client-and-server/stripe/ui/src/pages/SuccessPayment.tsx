import AppLayout from 'components/layout/AppLayout';
import { api } from 'services/api';
import { useAppDispatch } from 'services/store';
export default function SuccessPayment() {
  const dispatch = useAppDispatch();
  dispatch(api.util.invalidateTags(['Products']));
  return <AppLayout title="Payment Successful">{}</AppLayout>;
}
