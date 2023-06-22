import { test } from 'vitest'
import { render } from '@testing-library/react'
import {StatefulFooter} from '../StatefulFooter'

test('home', () => {
  const {debug} = render(<StatefulFooter />)
  debug()
})