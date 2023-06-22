import { test } from 'vitest'
import { render } from '@testing-library/react'
import {StatefulHeader} from '../StatefulHeader'

test('home', () => {
  const {debug} = render(<StatefulHeader pageName="test" />)
  debug()
})