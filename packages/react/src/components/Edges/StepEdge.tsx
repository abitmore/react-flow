import { memo, useMemo } from 'react';
import { Optional } from '@xyflow/system';

import SmoothStepEdge from './SmoothStepEdge';
import type { SmoothStepEdgeProps } from '../../types';

const StepEdge = memo((props: Optional<SmoothStepEdgeProps, 'id' | 'source' | 'target'>) => (
  <SmoothStepEdge
    {...props}
    pathOptions={useMemo(() => ({ borderRadius: 0, offset: props.pathOptions?.offset }), [props.pathOptions?.offset])}
  />
));

StepEdge.displayName = 'StepEdge';

export default StepEdge;
