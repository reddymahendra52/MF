// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

import Bookings from 'src/views/dashboard/bookings'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Book Now',
      icon: Table,
      path: '/pages/booknow'
    },
    {
      title: 'My Bookings',
      icon: Table,
      path: '/pages/bookings'
    },
    {
      title: 'FAQ',
      icon: HelpCircleOutline,
      path: '/pages/faq'
    },
    {
      sectionTitle: 'Account'
    },
    {
      title: 'Profile',
      icon: AccountCogOutline,
      path: '/pages/profile'
    },
    {
      title: 'Raise a Query',
      icon: AlertCircleOutline,
      path: '/pages/query'
    },
    {
      title: 'Logout',
      icon: Login,
      path: '/pages/logout'
    }
  ]
}

export default navigation
