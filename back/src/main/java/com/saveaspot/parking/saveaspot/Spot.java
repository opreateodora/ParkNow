package com.saveaspot.parking.saveaspot;
import javax.persistence.*;
@Entity
@Table(name="Spot")
public class Spot {
    public Spot(){}
    @Id
    @GeneratedValue
    @Column(name="id")
    private Integer id;
    @Column(name="spotLatitude")
    private double spotLatitude;
    @Column(name="spotLongitude")
    private double spotLongitude;
    @Column(name="fullName")
    private String fullName;
    @Column(name="address")
    private String address;
    @Column(name="noPhone")
    private String noPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Integer getId() {
        return id;
    }
    public double getspotLatitude() {
        return spotLatitude;
    }
    public void setspotLatitude(double lat) {
        this.spotLatitude = lat;
    }
    public double getspotLongitude() {
        return spotLongitude;
    }
    public void setspotLongitude(double lng) {
        this.spotLongitude = lng;
    }
    public String getfullName() {
        return fullName;
    }
    public void setfullname(String fn) {
        this.fullName = fn;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String ad) {
        this.address = ad;
    }
    public String getnoPhone() {
        return noPhone;
    }
    public void setnoPhone(String ad) {
        this.noPhone = ad;
    }
    public User getUser() {
        return user;}
    public void setUser(User user) {
        this.user = user;}
}
