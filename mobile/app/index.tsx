import React from 'react';
import { Link } from 'expo-router';
import { Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Svg, Path } from 'react-native-svg';
import Screen from '../components/ui/Screen';

const { width, height } = Dimensions.get('window');

// SVG Icons
const UserIcon = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 17 18" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.5 1.8C6.24465 1.8 4.41633 3.41177 4.41633 5.4C4.41633 7.38822 6.24465 9 8.5 9C10.7554 9 12.5837 7.38823 12.5837 5.4C12.5837 3.41177 10.7554 1.8 8.5 1.8ZM12.2172 9.69244C13.6811 8.70569 14.6255 7.15006 14.6255 5.4C14.6255 2.41766 11.883 0 8.5 0C5.11697 0 2.37449 2.41766 2.37449 5.4C2.37449 7.15006 3.31885 8.70569 4.78285 9.69244C3.75634 10.0927 2.81196 10.6592 2.00292 11.3724C1.37819 11.9232 0.852653 12.5451 0.436555 13.2166C-0.331295 14.4557 -0.0181533 15.7192 0.846577 16.6125C1.67904 17.4726 3.01259 18 4.41633 18H12.5837C13.9874 18 15.321 17.4726 16.1534 16.6125C17.0182 15.7192 17.3313 14.4557 16.5634 13.2166C16.1473 12.5451 15.6218 11.9232 14.9971 11.3724C14.188 10.6592 13.2437 10.0927 12.2172 9.69244ZM8.5 10.8C6.60465 10.8 4.78693 11.4637 3.44671 12.6452C2.96075 13.0736 2.55206 13.5573 2.22845 14.0795C1.91507 14.5853 2.01616 15.0478 2.39981 15.4442C2.81573 15.8739 3.56472 16.2 4.41633 16.2H12.5837C13.4353 16.2 14.1843 15.8739 14.6002 15.4442C14.9838 15.0478 15.0849 14.5853 14.7715 14.0795C14.4479 13.5573 14.0392 13.0736 13.5533 12.6452C12.2131 11.4637 10.3954 10.8 8.5 10.8Z"
      fill="black"
    />
  </Svg>
);

const CartIcon = ({ size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 20 18" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.10002 3.6C5.56329 1.54598 7.58104 0 10 0C12.419 0 14.4367 1.54598 14.9 3.6H15C17.7614 3.6 20 5.61472 20 8.1V13.5C20 15.9853 17.7614 18 15 18H5C2.23858 18 0 15.9853 0 13.5V8.1C0 5.61472 2.23858 3.6 5 3.6H5.10002ZM5 5.4C3.34315 5.4 2 6.60883 2 8.1V13.5C2 14.9912 3.34315 16.2 5 16.2H15C16.6569 16.2 18 14.9912 18 13.5V8.1C18 6.60883 16.6569 5.4 15 5.4H5ZM12.8293 3.6H7.17071C7.58254 2.55133 8.69378 1.8 10 1.8C11.3062 1.8 12.4175 2.55133 12.8293 3.6Z"
      fill="black"
    />
  </Svg>
);

const MenuIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <Path d="M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </Svg>
);

const EIcon = ({ fill = "#FFF", size = 12 }) => (
  <Svg width={size} height={size * 1.4} viewBox="0 0 10 14" fill="none">
    <Path
      d="M8.66351 5.09976C7.83929 4.29691 6.71977 3.84092 5.56546 3.73927L5.56314 3.63787C5.55409 3.22895 5.54365 3.13995 5.49007 3.02051C5.39751 2.81371 5.25461 2.6685 4.90085 2.42189C4.72617 2.29987 4.53989 2.15864 4.48723 2.10782C4.32879 1.95536 4.29492 1.6797 4.41184 1.49632C4.43643 1.45768 4.53131 1.38835 4.6227 1.34221C4.90966 1.19724 5.28129 1.23636 5.50097 1.43449C5.6434 1.56283 5.68354 1.67806 5.70557 2.01906C5.71972 2.23968 5.73689 2.32259 5.77679 2.36357C5.96585 2.55772 6.81651 2.52775 6.92275 2.32352C6.96381 2.24436 6.93157 1.72139 6.86917 1.45416C6.74483 0.921822 6.34281 0.407513 5.87561 0.182913C5.59005 0.0452024 5.37965 1.41355e-06 5.02101 1.41355e-06C4.53084 -0.000466991 4.15086 0.115463 3.82192 0.365591C3.22853 0.81643 2.93739 1.53028 3.08516 2.1727C3.18584 2.61065 3.42687 2.93198 3.89731 3.25565C4.19981 3.46385 4.30327 3.57416 4.32508 3.76714C3.4322 3.88635 2.57481 4.2222 1.87564 4.7789C0.759365 5.66559 0.139059 6.97173 0.021679 8.38608C-0.0713437 9.46903 0.132564 10.6176 0.680493 11.5633C2.04173 13.906 5.11589 14.5826 7.49527 13.4926C8.22878 13.1603 8.85025 12.6167 9.2968 11.9457C9.4571 11.7071 9.65915 11.4176 9.6675 11.1113C9.6675 10.8813 9.53249 10.7026 9.32163 10.626C9.16156 10.5412 8.98433 10.5412 8.82404 10.5414H8.03137C7.83744 10.5419 7.62657 10.5419 7.44122 10.6267C7.20507 10.7379 7.05336 10.9675 6.87636 11.1548C6.64021 11.4019 6.37042 11.6061 6.05841 11.734C5.11055 12.1174 3.88618 11.8794 3.23224 11.071C2.87267 10.6236 2.72026 10.0944 2.61866 9.54187L6.28435 9.54046L8.75444 9.53953C9.04975 9.53953 9.49654 9.62407 9.74452 9.43648C10.0818 9.1894 9.99714 8.56197 9.97186 8.2027C9.87907 7.04059 9.51556 5.92883 8.66351 5.09976ZM2.71516 7.89355C3.07728 6.09863 5.26435 5.22435 6.68498 6.40379C6.90443 6.58249 7.08143 6.81224 7.21644 7.05933C7.35957 7.3228 7.46906 7.59448 7.50316 7.89191L2.71493 7.89355H2.71516Z"
      fill={fill}
    />
  </Svg>
);

const FacebookIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Path
      d="M8.99982 0C4.0294 0 0 4.04428 0 9.03306C0 13.2692 2.90586 16.8239 6.82582 17.8002V11.7936H4.97006V9.03306H6.82582V7.84359C6.82582 4.76909 8.21216 3.34404 11.2195 3.34404C11.7898 3.34404 12.7736 3.45641 13.1761 3.56842V6.07058C12.9637 6.04818 12.5947 6.03698 12.1364 6.03698C10.6608 6.03698 10.0906 6.59811 10.0906 8.05677V9.03306H13.0303L12.5252 11.7936H10.0906V18C14.5469 17.4598 18 13.6515 18 9.03306C17.9996 4.04428 13.9702 0 8.99982 0Z"
      fill="black"
    />
  </Svg>
);

const InstagramIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <Path
      d="M8.70466 1.56752C11.0304 1.56752 11.3059 1.57772 12.2205 1.61852C13.0706 1.65592 13.5296 1.79874 13.8356 1.91774C14.2403 2.07416 14.5327 2.26457 14.8353 2.56719C15.1413 2.87322 15.3284 3.16224 15.4848 3.56687C15.6038 3.87289 15.7466 4.33533 15.784 5.18199C15.8248 6.10006 15.835 6.37548 15.835 8.69786C15.835 11.0236 15.8248 11.2991 15.784 12.2137C15.7466 13.0638 15.6038 13.5228 15.4848 13.8288C15.3284 14.2335 15.1379 14.5259 14.8353 14.8285C14.5293 15.1345 14.2403 15.3216 13.8356 15.478C13.5296 15.597 13.0672 15.7398 12.2205 15.7772C11.3025 15.818 11.027 15.8282 8.70466 15.8282C6.37888 15.8282 6.10346 15.818 5.18879 15.7772C4.33873 15.7398 3.87969 15.597 3.57367 15.478C3.16904 15.3216 2.87662 15.1311 2.57399 14.8285C2.26797 14.5225 2.08096 14.2335 1.92455 13.8288C1.80554 13.5228 1.66273 13.0604 1.62532 12.2137C1.58452 11.2957 1.57432 11.0202 1.57432 8.69786C1.57432 6.37208 1.58452 6.09666 1.62532 5.18199C1.66273 4.33193 1.80554 3.87289 1.92455 3.56687C2.08096 3.16224 2.27137 2.86982 2.57399 2.56719C2.88002 2.26117 3.16904 2.07416 3.57367 1.91774C3.87969 1.79874 4.34213 1.65592 5.18879 1.61852C6.10346 1.57772 6.37888 1.56752 8.70466 1.56752ZM8.70466 0C6.34148 0 6.04566 0.0102008 5.11739 0.0510039C4.19252 0.0918069 3.55667 0.241418 3.00583 0.455634C2.43118 0.680051 1.94495 0.975874 1.46211 1.46211C0.975874 1.94495 0.680051 2.43118 0.455634 3.00243C0.241418 3.55667 0.0918069 4.18912 0.0510039 5.11399C0.0102008 6.04566 0 6.34148 0 8.70466C0 11.0678 0.0102008 11.3637 0.0510039 12.2919C0.0918069 13.2168 0.241418 13.8526 0.455634 14.4035C0.680051 14.9781 0.975874 15.4644 1.46211 15.9472C1.94495 16.43 2.43118 16.7293 3.00243 16.9503C3.55667 17.1645 4.18912 17.3141 5.11399 17.3549C6.04226 17.3957 6.33808 17.4059 8.70126 17.4059C11.0644 17.4059 11.3603 17.3957 12.2885 17.3549C13.2134 17.3141 13.8492 17.1645 14.4001 16.9503C14.9713 16.7293 15.4576 16.43 15.9404 15.9472C16.4232 15.4644 16.7225 14.9781 16.9435 14.4069C17.1577 13.8526 17.3073 13.2202 17.3481 12.2953C17.3889 11.3671 17.3991 11.0712 17.3991 8.70806C17.3991 6.34488 17.3889 6.04906 17.3481 5.12079C17.3073 4.19592 17.1577 3.56007 16.9435 3.00923C16.7293 2.43118 16.4334 1.94495 15.9472 1.46211C15.4644 0.979274 14.9781 0.680051 14.4069 0.459035C13.8526 0.244818 13.2202 0.0952072 12.2953 0.0544041C11.3637 0.0102008 11.0678 0 8.70466 0Z"
      fill="black"
    />
    <Path
      d="M8.70461 4.2334C6.23603 4.2334 4.23328 6.23615 4.23328 8.70474C4.23328 11.1733 6.23603 13.1761 8.70461 13.1761C11.1732 13.1761 13.176 11.1733 13.176 8.70474C13.176 6.23615 11.1732 4.2334 8.70461 4.2334ZM8.70461 11.6052C7.10309 11.6052 5.80419 10.3063 5.80419 8.70474C5.80419 7.10322 7.10309 5.80432 8.70461 5.80432C10.3061 5.80432 11.605 7.10322 11.605 8.70474C11.605 10.3063 10.3061 11.6052 8.70461 11.6052Z"
      fill="black"
    />
    <Path
      d="M14.3967 4.05658C14.3967 4.63462 13.9274 5.10046 13.3528 5.10046C12.7747 5.10046 12.3089 4.63122 12.3089 4.05658C12.3089 3.47853 12.7781 3.0127 13.3528 3.0127C13.9274 3.0127 14.3967 3.48193 14.3967 4.05658Z"
      fill="black"
    />
  </Svg>
);

const TikTokIcon = () => (
  <Svg width="15" height="17" viewBox="0 0 15 17" fill="none">
    <Path
      d="M11.0287 0H8.06913V11.5797C8.06913 12.9594 6.93087 14.0928 5.51434 14.0928C4.09781 14.0928 2.95953 12.9594 2.95953 11.5797C2.95953 10.2246 4.07251 9.11592 5.43847 9.06667V6.15943C2.42833 6.20868 0 8.59855 0 11.5797C0 14.5855 2.47892 17 5.53964 17C8.60032 17 11.0792 14.5609 11.0792 11.5797V5.64202C12.1922 6.43044 13.5582 6.89855 15 6.9232V4.01594C12.774 3.94203 11.0287 2.16811 11.0287 0Z"
      fill="black"
    />
  </Svg>
);

const PinterestIcon = () => (
  <Svg width="17" height="18" viewBox="0 0 17 18" fill="none">
    <Path
      d="M8.5 0C3.80508 0 0 4.02891 0 9C0 12.8145 2.24121 16.0699 5.40215 17.3812C5.3291 16.6676 5.25938 15.5777 5.43203 14.8008C5.58809 14.0977 6.42813 10.3289 6.42813 10.3289C6.42813 10.3289 6.17246 9.79102 6.17246 8.99297C6.17246 7.74141 6.85644 6.80625 7.70976 6.80625C8.43359 6.80625 8.78555 7.38281 8.78555 8.07539C8.78555 8.84883 8.3207 10.002 8.08164 11.0707C7.88242 11.9672 8.50664 12.6984 9.34004 12.6984C10.8508 12.6984 12.0129 11.0109 12.0129 8.57812C12.0129 6.42305 10.552 4.91484 8.46348 4.91484C6.04629 4.91484 4.6252 6.83437 4.6252 8.8207C4.6252 9.59414 4.90742 10.4238 5.25937 10.8738C5.3291 10.9617 5.33906 11.0426 5.31914 11.1305C5.25605 11.4152 5.10996 12.027 5.0834 12.15C5.04688 12.3152 4.96055 12.3504 4.79785 12.2695C3.73535 11.7457 3.07129 10.1039 3.07129 8.78203C3.07129 5.94141 5.02031 3.33633 8.68594 3.33633C11.6344 3.33633 13.9254 5.56172 13.9254 8.53594C13.9254 11.6367 12.0793 14.1328 9.51602 14.1328C8.65606 14.1328 7.8459 13.6582 7.56699 13.0992C7.56699 13.0992 7.14199 14.8184 7.03906 15.2402C6.84648 16.0207 6.32852 17.0016 5.9832 17.5992C6.78008 17.8594 7.62344 18 8.5 18C13.1949 18 17 13.9711 17 9C17 4.02891 13.1949 0 8.5 0Z"
      fill="black"
    />
  </Svg>
);

export default function HomeScreen() {
  return (
    <Screen headerHidden>
      <StatusBar style="dark" />
      
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={{ backgroundColor: '#FFFFFF' }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Mobile Header */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingTop: 50,
          paddingBottom: 20,
          backgroundColor: '#FFFFFF'
        }}>
          {/* Menu Icon */}
          <TouchableOpacity style={{ padding: 8 }}>
            <MenuIcon />
          </TouchableOpacity>

          {/* Logo */}
          <View style={{
            paddingHorizontal: 20,
            paddingVertical: 8,
            backgroundColor: '#1D62DB',
            borderRadius: 8
          }}>
            <Text style={{ 
              fontFamily: 'Inter', 
              fontSize: 18, 
              fontWeight: '700', 
              color: '#FFFFFF' 
            }}>eazzy</Text>
          </View>

          {/* Right Icons */}
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <TouchableOpacity style={{ padding: 8 }}>
              <CartIcon size={22} />
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 8 }}>
              <UserIcon size={22} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={{ 
          paddingHorizontal: 20, 
          paddingVertical: 40 
        }}>
          {/* Blue Tag */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#E9F1FF',
            borderRadius: 20,
            paddingHorizontal: 16,
            paddingVertical: 8,
            alignSelf: 'flex-start',
            marginBottom: 20
          }}>
            <View style={{ marginRight: 8 }}>
              <EIcon fill="#1D62DB" size={10} />
            </View>
            <Text style={{
              fontFamily: 'Inter',
              fontSize: 14,
              fontWeight: '500',
              color: '#1D62DB'
            }}>laundry service</Text>
          </View>

          {/* Main Heading */}
          <Text style={{
            fontFamily: 'Inter',
            fontSize: 32,
            fontWeight: '600',
            color: '#000000',
            lineHeight: 40,
            marginBottom: 16
          }}>Enhancing Your{'\n'}Laundry Experience</Text>

          {/* Description */}
          <Text style={{
            fontFamily: 'Inter',
            fontSize: 16,
            fontWeight: '400',
            color: '#666666',
            lineHeight: 24,
            marginBottom: 32
          }}>Discover the range of benefits and features that make our service stand out</Text>

          {/* Hero Image */}
          <View style={{
            width: '100%',
            height: 240,
            backgroundColor: '#D9D9D9',
            borderRadius: 20,
            marginBottom: 32
          }} />

          {/* CTA Button */}
          <TouchableOpacity style={{
            backgroundColor: '#000000',
            borderRadius: 25,
            paddingVertical: 16,
            paddingHorizontal: 32,
            alignItems: 'center',
            width: '100%'
          }}>
            <Text style={{
              fontFamily: 'Inter',
              fontSize: 16,
              fontWeight: '600',
              color: '#FFFFFF'
            }}>Explore our services</Text>
          </TouchableOpacity>
        </View>

        {/* Services Section */}
        <View style={{
          marginHorizontal: 20,
          borderRadius: 25,
          overflow: 'hidden',
          marginBottom: 40
        }}>
          {/* Background with overlay */}
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/5cfdbc7504bf15d6043dfb6a6f48f6a32fc666b2?width=1250' }}
              style={{
                width: '100%',
                height: 600,
                position: 'absolute'
              }}
            />
            
            {/* Dark Overlay */}
            <View style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }} />

            {/* Content */}
            <View style={{ 
              position: 'relative', 
              zIndex: 1, 
              padding: 24,
              minHeight: 600
            }}>
              {/* Service Badge */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#1D62DB',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                alignSelf: 'flex-start',
                marginBottom: 20
              }}>
                <View style={{ marginRight: 8 }}>
                  <EIcon fill="#FFFFFF" size={10} />
                </View>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#FFFFFF'
                }}>The Services of eazzy</Text>
              </View>

              {/* Services Title */}
              <Text style={{
                fontFamily: 'Inter',
                fontSize: 28,
                fontWeight: '600',
                color: '#FFFFFF',
                lineHeight: 36,
                marginBottom: 16
              }}>Discover the Services{'\n'}of eazzy</Text>

              {/* Services Subtitle */}
              <Text style={{
                fontFamily: 'Inter',
                fontSize: 16,
                fontWeight: '400',
                color: '#FFFFFF',
                marginBottom: 32,
                opacity: 0.9
              }}>Explore Eazyy services, from bag-based washes to expert dry cleaning.</Text>

              {/* Service Cards */}
              <View style={{ gap: 16 }}>
                {/* eazzy bag Service */}
                <View style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  padding: 20
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/8053aaf5482c5a1eaffc8f5b8f8d52642ee84791?width=160' }}
                      style={{ 
                        width: 50, 
                        height: 50, 
                        marginRight: 16
                      }}
                    />
                    
                    <View style={{ flex: 1 }}>
                      {/* Service Badge */}
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#E9F1FF',
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        alignSelf: 'flex-start',
                        marginBottom: 8
                      }}>
                        <View style={{ marginRight: 6 }}>
                          <EIcon fill="#1D62DB" size={8} />
                        </View>
                        <Text style={{
                          fontFamily: 'Inter',
                          fontSize: 12,
                          fontWeight: '500',
                          color: '#1D62DB'
                        }}>eazzy bag</Text>
                      </View>

                      <Text style={{
                        fontFamily: 'Inter',
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#000000',
                        marginBottom: 8
                      }}>eazzy bag</Text>

                      <Text style={{
                        fontFamily: 'Inter',
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#666666',
                        lineHeight: 18,
                        marginBottom: 12
                      }}>Fill the sturdy eazzy Bag with a week's laundry; we clean and return items fresh.</Text>

                      <TouchableOpacity style={{
                        backgroundColor: '#1D62DB',
                        borderRadius: 20,
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        alignSelf: 'flex-start'
                      }}>
                        <Text style={{
                          fontFamily: 'Inter',
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#FFFFFF'
                        }}>Go to service</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Dry Clean Service */}
                <View style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  padding: 20
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/fce4d46b116b276f657742c2e7a9594f49ddecfa?width=160' }}
                      style={{ 
                        width: 50, 
                        height: 50, 
                        marginRight: 16
                      }}
                    />
                    
                    <View style={{ flex: 1 }}>
                      {/* Service Badge */}
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#D9FFE3',
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        alignSelf: 'flex-start',
                        marginBottom: 8
                      }}>
                        <View style={{ marginRight: 6 }}>
                          <EIcon fill="#34A853" size={8} />
                        </View>
                        <Text style={{
                          fontFamily: 'Inter',
                          fontSize: 12,
                          fontWeight: '500',
                          color: '#34A853'
                        }}>Dry clean</Text>
                      </View>

                      <Text style={{
                        fontFamily: 'Inter',
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#000000',
                        marginBottom: 8
                      }}>Dry Cleaning</Text>

                      <Text style={{
                        fontFamily: 'Inter',
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#666666',
                        lineHeight: 18,
                        marginBottom: 12
                      }}>Gentle dry cleaning for delicate fabrics stains vanish colours stay vibrant and ready to wear</Text>

                      <TouchableOpacity style={{
                        backgroundColor: '#1D62DB',
                        borderRadius: 20,
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        alignSelf: 'flex-start'
                      }}>
                        <Text style={{
                          fontFamily: 'Inter',
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#FFFFFF'
                        }}>Go to service</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Wash & Iron Service */}
                <View style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  padding: 20
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/10e126fc0c1916f77d496f73706e02822c389a35?width=160' }}
                      style={{ 
                        width: 50, 
                        height: 50, 
                        marginRight: 16
                      }}
                    />
                    
                    <View style={{ flex: 1 }}>
                      {/* Service Badge */}
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFDDDA',
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        alignSelf: 'flex-start',
                        marginBottom: 8
                      }}>
                        <View style={{ marginRight: 6 }}>
                          <EIcon fill="#EA4335" size={8} />
                        </View>
                        <Text style={{
                          fontFamily: 'Inter',
                          fontSize: 12,
                          fontWeight: '500',
                          color: '#EA4335'
                        }}>Wash & Iron</Text>
                      </View>

                      <Text style={{
                        fontFamily: 'Inter',
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#000000',
                        marginBottom: 8
                      }}>Wash & Iron</Text>

                      <Text style={{
                        fontFamily: 'Inter',
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#666666',
                        lineHeight: 18,
                        marginBottom: 12
                      }}>Daily laundry expertly washed ironed for a crisp finish folded neatly and delivered to your door</Text>

                      <TouchableOpacity style={{
                        backgroundColor: '#1D62DB',
                        borderRadius: 20,
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        alignSelf: 'flex-start'
                      }}>
                        <Text style={{
                          fontFamily: 'Inter',
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#FFFFFF'
                        }}>Go to service</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Tailoring Service */}
                <View style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  padding: 20
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/054342f0a30f3564e498e0898a4167eaae155932?width=160' }}
                      style={{ 
                        width: 50, 
                        height: 50, 
                        marginRight: 16
                      }}
                    />
                    
                    <View style={{ flex: 1 }}>
                      {/* Service Badge */}
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFF5D9',
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        alignSelf: 'flex-start',
                        marginBottom: 8
                      }}>
                        <View style={{ marginRight: 6 }}>
                          <EIcon fill="#FBBC05" size={8} />
                        </View>
                        <Text style={{
                          fontFamily: 'Inter',
                          fontSize: 12,
                          fontWeight: '500',
                          color: '#FBBC05'
                        }}>Tailoring</Text>
                      </View>

                      <Text style={{
                        fontFamily: 'Inter',
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#000000',
                        marginBottom: 8
                      }}>Tailoring</Text>

                      <Text style={{
                        fontFamily: 'Inter',
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#666666',
                        lineHeight: 18,
                        marginBottom: 12
                      }}>Skilled tailors renew garments mend tears replace zippers secure hems bring life back</Text>

                      <TouchableOpacity style={{
                        backgroundColor: '#1D62DB',
                        borderRadius: 20,
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        alignSelf: 'flex-start'
                      }}>
                        <Text style={{
                          fontFamily: 'Inter',
                          fontSize: 12,
                          fontWeight: '600',
                          color: '#FFFFFF'
                        }}>Go to service</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Advantages Section */}
        <View style={{ 
          paddingHorizontal: 20,
          marginBottom: 40
        }}>
          {/* Section Header */}
          <View style={{ marginBottom: 32 }}>
            {/* Badge */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#E9F1FF',
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 8,
              alignSelf: 'flex-start',
              marginBottom: 20
            }}>
              <View style={{ marginRight: 8 }}>
                <EIcon fill="#1D62DB" size={10} />
              </View>
              <Text style={{
                fontFamily: 'Inter',
                fontSize: 14,
                fontWeight: '500',
                color: '#1D62DB'
              }}>laundry service</Text>
            </View>

            {/* Title */}
            <Text style={{
              fontFamily: 'Inter',
              fontSize: 28,
              fontWeight: '600',
              color: '#000000',
              lineHeight: 36,
              marginBottom: 16
            }}>Discover The Advantages{'\n'}Of Using eazzy</Text>

            {/* Description */}
            <Text style={{
              fontFamily: 'Inter',
              fontSize: 16,
              fontWeight: '400',
              color: '#666666',
              lineHeight: 24,
              marginBottom: 32
            }}>The advantages of eazzy are many as speed, quality, trust and many more.</Text>

            {/* Button */}
            <TouchableOpacity style={{
              backgroundColor: '#000000',
              borderRadius: 25,
              paddingVertical: 16,
              paddingHorizontal: 32,
              alignItems: 'center',
              width: '100%'
            }}>
              <Text style={{
                fontFamily: 'Inter',
                fontSize: 16,
                fontWeight: '600',
                color: '#FFFFFF'
              }}>Explore our services</Text>
            </TouchableOpacity>
          </View>

          {/* Features Grid */}
          <View style={{ gap: 16 }}>
            {/* Quality */}
            <View style={{
              backgroundColor: '#F6F6F6',
              borderRadius: 20,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Image
                source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/8174fe185ec956090a9ec61d65499ee69dbb554d?width=112' }}
                style={{ 
                  width: 50, 
                  height: 50, 
                  marginRight: 16
                }}
              />
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: 8
                }}>Quality</Text>

                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666',
                  lineHeight: 18
                }}>Professionally cleaned with care and consistency. High-end results for every fabric and garment.</Text>
              </View>
            </View>

            {/* Tracking */}
            <View style={{
              backgroundColor: '#F6F6F6',
              borderRadius: 20,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Image
                source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/9ce1fc98e077dde3572ecff61f8e3d640bb8b73f?width=114' }}
                style={{ 
                  width: 50, 
                  height: 50, 
                  marginRight: 16
                }}
              />
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: 8
                }}>Tracking</Text>

                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666',
                  lineHeight: 18
                }}>Live updates from pickup to drop-off. Stay informed every step with real-time notifications.</Text>
              </View>
            </View>

            {/* Speed */}
            <View style={{
              backgroundColor: '#F6F6F6',
              borderRadius: 20,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Image
                source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/63e21f8daeff046717d237dffe553f902b396645?width=114' }}
                style={{ 
                  width: 50, 
                  height: 50, 
                  marginRight: 16
                }}
              />
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: 8
                }}>Speed</Text>

                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666',
                  lineHeight: 18
                }}>Fast pickup and delivery across your entire city. Same-day collection and next-day return without delays.</Text>
              </View>
            </View>

            {/* Trust */}
            <View style={{
              backgroundColor: '#F6F6F6',
              borderRadius: 20,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Image
                source={{ uri: 'https://api.builder.io/api/v1/image/assets/TEMP/805b4b74f2257b828c16a070418e5476be3e5789?width=114' }}
                style={{ 
                  width: 50, 
                  height: 50, 
                  marginRight: 16
                }}
              />
              
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#000000',
                  marginBottom: 8
                }}>Trust</Text>

                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666',
                  lineHeight: 18
                }}>Handled by friendly drivers and skilled cleaners. Your clothes stay safe and in good hands throughout.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={{
          marginHorizontal: 20,
          backgroundColor: '#F6F6F6',
          borderRadius: 25,
          padding: 24
        }}>
          {/* Logo */}
          <View style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: '#1D62DB',
            borderRadius: 8,
            alignSelf: 'center',
            marginBottom: 32
          }}>
            <Text style={{ 
              fontFamily: 'Inter', 
              fontSize: 18, 
              fontWeight: '700', 
              color: '#FFFFFF' 
            }}>eazzy</Text>
          </View>

          {/* Footer Links */}
          <View style={{ gap: 24, marginBottom: 32 }}>
            {/* Sections */}
            <View>
              <Text style={{
                fontFamily: 'Inter',
                fontSize: 16,
                fontWeight: '600',
                color: '#000000',
                marginBottom: 12
              }}>Sections</Text>
              <View style={{ gap: 8 }}>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666'
                }}>Personal</Text>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666'
                }}>Business</Text>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666'
                }}>Company</Text>
              </View>
            </View>

            {/* Help */}
            <View>
              <Text style={{
                fontFamily: 'Inter',
                fontSize: 16,
                fontWeight: '600',
                color: '#000000',
                marginBottom: 12
              }}>Help</Text>
              <View style={{ gap: 8 }}>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666'
                }}>Privacy</Text>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666'
                }}>Complaints</Text>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666'
                }}>Cookie Policy</Text>
              </View>
            </View>

            {/* Company policies */}
            <View>
              <Text style={{
                fontFamily: 'Inter',
                fontSize: 16,
                fontWeight: '600',
                color: '#000000',
                marginBottom: 12
              }}>Company policies</Text>
              <View style={{ gap: 8 }}>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666'
                }}>Website terms</Text>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666'
                }}>Legal Agreements</Text>
                <Text style={{
                  fontFamily: 'Inter',
                  fontSize: 14,
                  fontWeight: '400',
                  color: '#666666'
                }}>Modern Slavery Policy</Text>
              </View>
            </View>
          </View>

          {/* Social Icons */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 16
          }}>
            <View style={{
              width: 40,
              height: 40,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <FacebookIcon />
            </View>
            
            <View style={{
              width: 40,
              height: 40,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <InstagramIcon />
            </View>
            
            <View style={{
              width: 40,
              height: 40,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <TikTokIcon />
            </View>
            
            <View style={{
              width: 40,
              height: 40,
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <PinterestIcon />
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
