export const dynamic = 'force-dynamic'
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../src/lib/supabase'
import { NavigationRoot } from '../../components/navigation/NavigationRoot'

 import ExperimentsTestClient from '../../components/experiments/ExperimentsTestClient'
 
 export default function ExperimentsTestPage() {
   return <ExperimentsTestClient />
 }
}
