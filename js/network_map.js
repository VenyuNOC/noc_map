var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("database", ["require", "exports", "mongoose"], function (require, exports, Mongoose) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.disconnect = exports.connect = void 0;
    let database;
    exports.connect = (uri) => {
        if (database)
            return;
        Mongoose.connect(uri, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        database = Mongoose.connection;
        database.once("open", () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('connected to object store');
        }));
        database.on("error", () => {
            console.log('error connecting to database');
        });
    };
    exports.disconnect = () => {
        if (!database)
            return;
        Mongoose.disconnect();
    };
});
define("network_map", ["require", "exports", "leaflet"], function (require, exports, L) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function setupMap(noc_map, focus) {
        noc_map.setView({
            lat: focus.lat,
            lng: focus.lon
        }, focus.zoom);
        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors',
        }).addTo(noc_map);
        L.control.scale().addTo(noc_map);
    }
    function addEndpoints(noc_map, endpoints) {
        endpoints.forEach((endpoint) => {
            L.marker({
                lat: endpoint.lat,
                lng: endpoint.lon,
            })
                .bindPopup(endpoint.label)
                .addTo(noc_map);
        });
    }
    window.onload = () => {
        var noc_map = L.map('map');
        setupMap(noc_map, {
            lat: 32.287133,
            lon: -90.197754,
            zoom: 7
        });
        addEndpoints(noc_map, [
            {
                lat: 30.45167,
                lon: -91.11642,
                "label": "BTR DCs & NOC"
            },
            {
                lat: 32.512915,
                lon: -93.746901,
                label: "SHV DC & NOC"
            }
        ]);
    };
});
define("endpoints/endpoints.types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("endpoints/endpoints.methods", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("endpoints/endpoints.schema", ["require", "exports", "mongoose"], function (require, exports, mongoose_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const EndpointSchema = new mongoose_1.Schema({
        lat: Number,
        lon: Number,
        label: String
    });
    exports.default = EndpointSchema;
});
define("endpoints/endpoints.model", ["require", "exports", "mongoose", "endpoints/endpoints.schema"], function (require, exports, mongoose_2, endpoints_schema_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointModel = void 0;
    exports.EndpointModel = mongoose_2.model("endpoint", endpoints_schema_1.default);
});
define("endpoints/endpoints.statics", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29ya19tYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9kYXRhYmFzZS50cyIsIi4uL3RzL25ldHdvcmtfbWFwLnRzIiwiLi4vdHMvZW5kcG9pbnRzL2VuZHBvaW50cy50eXBlcy50cyIsIi4uL3RzL2VuZHBvaW50cy9lbmRwb2ludHMubWV0aG9kcy50cyIsIi4uL3RzL2VuZHBvaW50cy9lbmRwb2ludHMuc2NoZW1hLnRzIiwiLi4vdHMvZW5kcG9pbnRzL2VuZHBvaW50cy5tb2RlbC50cyIsIi4uL3RzL2VuZHBvaW50cy9lbmRwb2ludHMuc3RhdGljcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0lBRUEsSUFBSSxRQUE2QixDQUFDO0lBRXJCLFFBQUEsT0FBTyxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxRQUFRO1lBQUUsT0FBTztRQUVyQixRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtZQUNsQixlQUFlLEVBQUUsSUFBSTtZQUNyQixnQkFBZ0IsRUFBRSxJQUFJO1lBQ3RCLGtCQUFrQixFQUFFLElBQUk7WUFDeEIsY0FBYyxFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsUUFBUSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFFL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBUyxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQTtJQUVZLFFBQUEsVUFBVSxHQUFHLEdBQUcsRUFBRTtRQUMzQixJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFFdEIsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQTs7Ozs7SUMzQkQsU0FBUyxRQUFRLENBQUMsT0FBYyxFQUFFLEtBQW1CO1FBQ2pELE9BQU8sQ0FBQyxPQUFPLENBQ1g7WUFDSSxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7WUFDZCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7U0FDakIsRUFDRCxLQUFLLENBQUMsSUFBSSxDQUNiLENBQUM7UUFFRixDQUFDLENBQUMsU0FBUyxDQUFDLDZFQUE2RSxFQUFFO1lBQ3ZGLE9BQU8sRUFBRSxFQUFFO1lBQ1gsV0FBVyxFQUFFLDhCQUE4QjtTQUM5QyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxCLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxTQUFTLFlBQVksQ0FBQyxPQUFjLEVBQUUsU0FBNEI7UUFDOUQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQzNCLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ0wsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHO2dCQUNqQixHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUc7YUFDcEIsQ0FBQztpQkFDRCxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztpQkFDekIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1FBQ2pCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFM0IsUUFBUSxDQUFDLE9BQU8sRUFBRTtZQUNkLEdBQUcsRUFBRSxTQUFTO1lBQ2QsR0FBRyxFQUFFLENBQUMsU0FBUztZQUNmLElBQUksRUFBRSxDQUFDO1NBQ1YsQ0FBQyxDQUFDO1FBRUgsWUFBWSxDQUFDLE9BQU8sRUFDaEI7WUFDSTtnQkFDSSxHQUFHLEVBQUUsUUFBUTtnQkFDYixHQUFHLEVBQUUsQ0FBQyxRQUFRO2dCQUNkLE9BQU8sRUFBRSxlQUFlO2FBQzNCO1lBQ0Q7Z0JBQ0ksR0FBRyxFQUFFLFNBQVM7Z0JBQ2QsR0FBRyxFQUFFLENBQUMsU0FBUztnQkFDZixLQUFLLEVBQUUsY0FBYzthQUN4QjtTQUNKLENBQ0osQ0FBQTtJQUNMLENBQUMsQ0FBQTs7Ozs7Ozs7Ozs7OztJR25ERCxNQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFNLENBQUM7UUFDOUIsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtRQUNYLEtBQUssRUFBRSxNQUFNO0tBQ2hCLENBQUMsQ0FBQztJQUVILGtCQUFlLGNBQWMsQ0FBQzs7Ozs7O0lDSmpCLFFBQUEsYUFBYSxHQUFHLGdCQUFLLENBQW9CLFVBQVUsRUFBRSwwQkFBYyxDQUFDLENBQUMifQ==