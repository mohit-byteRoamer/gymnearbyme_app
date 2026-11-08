import React from 'react'
import { Platform } from 'react-native'
import { LeafletMap as WebMap } from './LeafletMap.web'
import { LeafletMap as NativeMap } from './LeafletMap.native'

export const LeafletMap = Platform.OS === 'web' ? WebMap : NativeMap
