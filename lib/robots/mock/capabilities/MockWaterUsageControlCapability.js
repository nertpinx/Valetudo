const entities = require("../../../entities");
const IntensityPreset = require("../../../entities/core/ValetudoIntensityPreset");
const WaterUsageControlCapability = require("../../../core/capabilities/WaterUsageControlCapability");
const stateAttrs = entities.state.attributes;

/**
 * @extends WaterUsageControlCapability<import("../MockRobot")>
 */
class MockWaterUsageControlCapability extends WaterUsageControlCapability {
    /**
     * @param {object} options
     * @param {import("../MockRobot")} options.robot
     */
    constructor(options) {
        let presets = [
            new IntensityPreset({name: entities.state.attributes.IntensityStateAttribute.VALUE.OFF, value: 0}),
            new IntensityPreset({name: entities.state.attributes.IntensityStateAttribute.VALUE.MIN, value: 1}),
            new IntensityPreset({name: entities.state.attributes.IntensityStateAttribute.VALUE.LOW, value: 2}),
            new IntensityPreset({name: entities.state.attributes.IntensityStateAttribute.VALUE.MEDIUM, value: 3}),
            new IntensityPreset({name: entities.state.attributes.IntensityStateAttribute.VALUE.HIGH, value: 4}),
            new IntensityPreset({name: entities.state.attributes.IntensityStateAttribute.VALUE.TURBO, value: 5}),
            new IntensityPreset({name: entities.state.attributes.IntensityStateAttribute.VALUE.MAX, value: 6})
        ];
        super({
            robot: options.robot,
            presets: presets
        });

        this.StateAttr = new stateAttrs.IntensityStateAttribute({
            type: stateAttrs.IntensityStateAttribute.TYPE.WATER_GRADE,
            value: stateAttrs.IntensityStateAttribute.VALUE.MEDIUM
        });

        this.robot.state.upsertFirstMatchingAttribute(this.StateAttr);
    }

    /**
     * @param {string} preset
     * @returns {Promise<void>}
     */
    async setIntensity(preset) {
        const matchedPreset = this.presets.find(p => p.name === preset);

        if (matchedPreset) {
            this.StateAttr.value = matchedPreset.name;
        } else {
            throw new Error("Invalid Preset");
        }
    }
}

module.exports = MockWaterUsageControlCapability;