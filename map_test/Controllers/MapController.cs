using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using GeoJSON.Net;
using GeoJSON.Net.Feature;
using map_test.Models;
using Newtonsoft.Json.Serialization;
using System.Reflection;
using Newtonsoft.Json.Linq;



namespace map_test.Controllers
{
    public class MapController : Controller
    {
        public MapController()
        {

        }

        // GET: Map
        public ActionResult Map()
        {
            return View();
        }

        public string GetPropertyList()
        {
            var modelF = new List<GeoJSON.Net.Feature.Feature>();
            string serializedData = null;

            using (var context = new sdeBRTestEntities1())
            {
                var properties = (from p in context.PropertyLists select p).ToList();

                //var properties = context.PropertyLists.Where(p => new[]{333435,333450,334847,358085,359182}.Any(pn => pn == p.ParcelNumb ));
                foreach (var prop in properties)
                {
                    var point = new GeoJSON.Net.Geometry.Point(new GeoJSON.Net.Geometry.GeographicPosition(Convert.ToDouble(prop.LAT.ToString()), Convert.ToDouble(prop.LONG.ToString())));
                    var featureProperties = new Dictionary<string, object> { };
                    object val = null;

                    foreach (PropertyInfo propInfo in prop.GetType().GetProperties())
                    {
                        val = prop.GetType().GetProperty(propInfo.Name).GetValue(prop, null);
                       
                        featureProperties.Add(propInfo.Name, val == null ? "" : val.ToString());
                    }
                    modelF.Add(new GeoJSON.Net.Feature.Feature(point, featureProperties));
                }
                var fcol = new FeatureCollection(modelF);
                serializedData = JsonConvert.SerializeObject(fcol, Formatting.Indented, new JsonSerializerSettings { ContractResolver = new CamelCasePropertyNamesContractResolver(), NullValueHandling = NullValueHandling.Ignore });
            }



            return  serializedData;

        }

        [HttpPost]
        public JsonResult FindIntersect(List<Latlongs> objs)
        {
            string polyString = "POLYGON((";
            foreach (var o in objs)
            {
                polyString += o.lng.ToString() + ' ' + o.lat.ToString() + ',';
            }
            polyString += objs[0].lng.ToString() + ' ' + objs[0].lat.ToString() + ',';
            polyString = polyString.TrimEnd(',') + "))";
            try
            {
                string parcelIds = null;
                using (var context = new sdeBRTestEntities1())
                {
                    string sql = "select * " +
                                " from dbo.PropertyList pl " +
                                " where pl.geom.STIntersects((geography::STGeomFromText('" + polyString + "', 4326)).ReorientObject()) = 1 ";
                    //string sql = "select * " +
                    //            "from dbo.PropertyList pl " +
                    //            "where pl.geom.STIntersects(geography::STGeomFromText('POLYGON((-90.948429 30.4892, -90.948429 30.49690,  -90.9374427 30.49690, -90.9374427 30.489213526, -90.948429 30.4892))', 4326)) = 1 " +
                    //            "and pl.ParcelNumb < 1000";

                    IEnumerable<PropertyList> props = context.Database.SqlQuery<PropertyList>(sql);
                    foreach (var p in props)
                    {
                        parcelIds += p.ParcelNumb.ToString() + ',';
                    }
                }
                return Json(parcelIds);
            }
            catch(Exception e)
            {
                return null;
            }
            
        }
    }








    public class Latlongs
    {
        public double lat {get; set; }
        public double lng { get; set; }
    }
}