'use strict'

import admin from './admin'

export default app => {
  app.use('/crm/admin', admin)
}
