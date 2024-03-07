import { useIsRecoverySupported } from '@/features/recovery/hooks/useIsRecoverySupported'
import useWallet from '@/hooks/wallets/useWallet'
import { isSocialLoginWallet } from '@/services/mpc/SocialLoginModule'
import { Box, Grid, Paper, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import SpendingLimits from '../SpendingLimits'
import SocialSignerExport from './SocialSignerExport'
import SocialSignerMFA from './SocialSignerMFA'

const RecoverySettings = dynamic(() => import('@/features/recovery/components/RecoverySettings'))

const SecurityLogin = () => {
  const isRecoverySupported = useIsRecoverySupported()
  const wallet = useWallet()
  const isSocialLogin = isSocialLoginWallet(wallet?.label)

  return (
    <Box data-sid="38537" display="flex" flexDirection="column" gap={2}>
      {isRecoverySupported && <RecoverySettings />}

      {isSocialLogin && (
        <>
          <Paper sx={{ p: 4 }}>
            <Grid container spacing={3}>
              <Grid item lg={4} xs={12}>
                <Typography variant="h4" fontWeight="bold" mb={1}>
                  Multi-factor Authentication
                </Typography>
              </Grid>

              <Grid item xs>
                <SocialSignerMFA />
              </Grid>
            </Grid>
          </Paper>
          <Paper sx={{ p: 4, mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item lg={4} xs={12}>
                <Typography variant="h4" fontWeight="bold" mb={1}>
                  Social login signer export
                </Typography>
              </Grid>
              <Grid item xs>
                <SocialSignerExport />
              </Grid>
            </Grid>
          </Paper>
        </>
      )}

      <SpendingLimits />
    </Box>
  )
}

export default SecurityLogin
