import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'

const LinkButton = ({ href, style }: { href: string, style: StyleProp<ViewStyle> }) => {
  return (
    <Link
          href={"/login"}
          style={[
            defaultStyles.pillButton,
            {  },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "#fff", fontSize: 22, fontWeight: "900" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
  )
}

export default LinkButton