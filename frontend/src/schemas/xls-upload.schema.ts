import { JSONSchemaType } from 'ajv'
import { IXLSData } from '../models/IXLSXData'

const uploadItemSchema: JSONSchemaType<IXLSData> = {
    type: 'object',
    required: ['serie', 'marking', 'batch', 'plan', 'apparatus', 'can', 'conveyor', 'bbf', 'note'],
    properties: {
        serie: { type: 'string' },
        marking: { type: 'string' },
        batch: { type: 'string' },
        plan: { type: 'string' },
        apparatus: { type: 'string' },
        can: { type: 'string' },
        conveyor: { type: 'string' },
        bbf: { type: 'string' },
        note: { type: 'string' },
    },

    additionalProperties: false,
}

export const uploadArraySchema = {
    type: 'array',
    items: uploadItemSchema,
}
